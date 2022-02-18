package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type M map[string]interface{}

func CardToJSON(card Card) map[string]interface{} {
	return gin.H{"ID": card.ID, "title": card.Title, "body": card.Body, "board": card.BoardID}
}

func getCard(card_id int) (Card, error) {
	var card Card

	if err := db.First(&card, card_id); err.Error != nil {
		return Card{}, err.Error
	}
	return card, nil
}

func getAllCards(c *gin.Context) {
	var cards []Card
	db.Find(&cards)
	var response []M

	for _, u := range cards {
		response = append(response, CardToJSON(u))
	}
	c.JSON(http.StatusOK, response)
}

func updateCard(c *gin.Context) {
	var new_card Card
	var card Card
	if err := c.ShouldBindJSON(&new_card); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"Result": "Bad Parameter"})
		return
	}

	Card_id := c.Param("card_id")
	object := db.First(&card, Card_id)

	if object.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"Error": "Item not found"})
		return
	}
	if new_card.Title != "" {
		object.Update("Title", new_card.Title)
	}
	if new_card.Body != "" {
		object.Update("Body", new_card.Body)
	}
	if new_card.Status != "" {
		object.Update("Status", new_card.Status)
	}
	c.JSON(http.StatusOK, CardToJSON(card))
}

func deleteCard(c *gin.Context) {
	card_id, _ := strconv.Atoi(c.Param("card_id"))
	var card Card
	card, err := getCard(card_id)

	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusNotFound, gin.H{"Error": "Item not found"})
	} else {
		db.Delete(&card, card_id)
		c.JSON(http.StatusOK, gin.H{"Success": "Item deleted"})
	}
}

func getCardRoute(c *gin.Context) {
	card_id, _ := strconv.Atoi(c.Param("card_id"))
	card, err := getCard(card_id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"Error": "Item not found"})
		return
	}
	var comments []Comment
	db.Where("card_id = ?", card_id).Find(&comments)
	var comment_response []map[string]interface{}
	for _, comment := range comments {
		comment_response = append(comment_response, gin.H{"CommentID": comment.ID, "Body": comment.Body})
	}

	var checklists []Checklist
	db.Where("card_id = ?", card_id).Find(&checklists)
	var checklist_response []map[string]interface{}
	for _, checklist := range checklists {
		checklist_response = append(checklist_response, gin.H{"ChecklistID": checklist.ID, "Body": checklist.Body, "Checked": checklist.Checked})
	}

	var members []User
	db.Model(&card).Association("User").Find(&members)
	var member_response []map[string]interface{}
	for _, member := range members {
		member_response = append(member_response, userToJSON(member))
	}

	response := gin.H{"ID": card.ID, "title": card.Title, "body": card.Body, "board": card.BoardID, "members": member_response, "comments": comment_response, "checklists": checklist_response}
	c.JSON(http.StatusOK, response)
}

func createCard(c *gin.Context) {
	var Card Card
	if err := c.ShouldBindJSON(&Card); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"Error": err})
		return
	}

	var boards []Board
	db.Find(&boards)
	flag := false
	for _, v := range boards {
		if int(v.ID) == Card.BoardID {
			flag = true
			break
		}
	}
	if !flag {
		c.JSON(http.StatusNotFound, gin.H{"Error": "invalid Board ID"})
		return
	}

	db.Create(&Card)
	c.JSON(http.StatusOK, CardToJSON(Card))
}

func createBorad(c *gin.Context) {
	var board Board
	if err := c.ShouldBindJSON(&board); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusUnprocessableEntity, gin.H{"Result": "Bad json"})
		return
	}
	db.Create(&board)
	var user User
	user_id, _ := c.Get("user_id")
	db.Find(&user, user_id)
	db.Model(&board).Association("User").Append(&user)
	c.JSON(http.StatusOK, gin.H{"Board ID": board.ID})
}

func BoardToJSON(board Board) map[string]interface{} {
	return gin.H{"ID": board.ID, "name": board.Name}
}

func myBoards(c *gin.Context) {
	var user User
	user_id, _ := c.Get("user_id")
	user_id, _ = strconv.Atoi(user_id.(string))
	db.Find(&user, user_id)
	var boards []Board

	// db.Model(&boards).Association("User").Append(&user)

	var response []map[string]interface{}
	for _, board := range boards {
		response = append(response, BoardToJSON(board))
	}
	c.JSON(http.StatusOK, response)
}

func getBoard(board_id int) (Board, error) {
	var board Board

	if err := db.First(&board, board_id); err.Error != nil {
		return Board{}, err.Error
	}
	return board, nil
}

func getBoardCards(c *gin.Context) {
	board_id, _ := strconv.Atoi(c.Param("board_id"))
	var cards []Card
	db.Where("board_id = ?", board_id).Find(&cards)
	response := make(map[string][]map[string]interface{})
	for _, card := range cards {
		response[card.Status] = append(response[card.Status], CardToJSON(card))
	}
	c.JSON(http.StatusOK, response)
}

func getBoardMembers(c *gin.Context) {
	var board Board
	board_id, _ := strconv.Atoi(c.Param("board_id"))
	db.Find(&board, board_id)
	var members []User
	db.Model(&board).Association("User").Find(&members)
	var response []map[string]interface{}
	for _, member := range members {
		response = append(response, userToJSON(member))
	}
	c.JSON(http.StatusOK, response)
}

func getBoardRoute(c *gin.Context) {
	board_id, _ := strconv.Atoi(c.Param("board_id"))
	board, err := getBoard(board_id)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"Error": "Item not found"})
	} else {
		c.JSON(http.StatusOK, BoardToJSON(board))
	}
}

func updateBoard(c *gin.Context) {
	var new_board Board
	var board Board
	if err := c.ShouldBindJSON(&new_board); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"Result": "Bad Parameter"})
		return
	}

	board_id := c.Param("board_id")
	object := db.First(&board, board_id)

	if object.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"Error": "Item not found"})
	} else {
		if new_board.Name != "" {
			object.Update("Name", new_board.Name)
		}
		c.JSON(http.StatusOK, Board(board))
	}
}

func deleteBoard(c *gin.Context) {
	board_id, _ := strconv.Atoi(c.Param("board_id"))
	var board Board
	board, err := getBoard(board_id)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusNotFound, gin.H{"Error": "Item not found"})
	} else {
		db.Delete(&board, board_id)
		c.JSON(http.StatusOK, gin.H{"Success": "Item deleted"})
	}
}

func addMembetToBoard(c *gin.Context) {
	type RequestBody struct {
		Userid int `json:"userid" binding:"required"`
	}
	var body RequestBody

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"Result": "Bad Parameter"})
		return
	}

	uid := body.Userid
	var user User
	var board Board
	board_id := c.Param("board_id")
	object := db.First(&user, uid)
	if object.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"Error": "User not found", "uid": uid})
		return
	}
	object = db.First(&board, board_id)
	db.Model(&board).Association("User").Append(&user)
	if object.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"Error": "Board not found"})
	} else {
		c.JSON(http.StatusOK, gin.H{"Success": "Member added"})
	}
}
func removeMembetFromBoard(c *gin.Context) {
	type RequestBody struct {
		Userid int `json:"userid" binding:"required"`
	}
	var body RequestBody

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"Result": "Bad Parameter"})
		return
	}

	uid := body.Userid
	var user User
	var board Board
	board_id := c.Param("board_id")
	object := db.First(&user, uid)
	if object.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"Error": "User not found", "uid": uid})
		return
	}
	object = db.First(&board, board_id)
	if object.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"Error": "Board not found"})
	} else {
		c.JSON(http.StatusOK, gin.H{"Success": "Member removed"})
		db.Model(&board).Association("User").Delete(&user)
	}
}

func addMembetToCard(c *gin.Context) {
	type RequestBody struct {
		Userid int `json:"userid" binding:"required"`
	}
	var body RequestBody

	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"Result": "Bad Parameter"})
		return
	}

	uid := body.Userid
	fmt.Println(uid)
	var user User
	var card Card
	card_id := c.Param("card_id")
	object := db.Find(&user, uid)
	if object.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"Error": "User not found", "uid": uid})
		return
	}
	object = db.First(&card, card_id)
	if object.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"Error": "Card not found"})
	} else {
		db.Model(&card).Association("User").Append(&user)
		c.JSON(http.StatusOK, gin.H{"Success": "Member added"})
	}
}
func removeMembetFromCard(c *gin.Context) {
	type RequestBody struct {
		Userid int `json:"userid" binding:"required"`
	}
	var body RequestBody

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"Result": "Bad Parameter"})
		return
	}

	uid := body.Userid
	var user User
	var card Card
	card_id := c.Param("card_id")
	object := db.First(&user, uid)
	if object.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"Error": "User not found"})
		return
	}
	object = db.First(&card, card_id)
	if object.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"Error": "Card not found"})
	} else {
		db.Model(&card).Association("User").Delete(&user)
		c.JSON(http.StatusOK, gin.H{"Success": "Member removed"})
	}
}

func userToJSON(user User) map[string]interface{} {
	return gin.H{"ID": user.ID, "Username": user.Username}
}

func getMembers(c *gin.Context) {
	var users []User
	db.Find(&users)
	var response []M

	for _, u := range users {
		response = append(response, userToJSON(u))
	}
	c.JSON(http.StatusOK, response)
}

func addComment(c *gin.Context) {
	var comment Comment
	if err := c.ShouldBindJSON(&comment); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusUnprocessableEntity, gin.H{"Result": "Bad json"})
		return
	}
	card_id, _ := strconv.Atoi(c.Param("card_id"))
	comment.CardId = card_id
	db.Create(&comment)
	c.JSON(http.StatusOK, gin.H{"Comment ID": comment.ID})
}
func deleteComment(c *gin.Context) {
	comment_id, _ := strconv.Atoi(c.Param("comment_id"))
	var comment Comment
	result := db.Find(&comment, comment_id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"Error": "Comment not found"})
	} else {
		db.Delete(&comment)
		c.JSON(http.StatusOK, gin.H{"Success": "Comment deleted"})
	}
}

func addChecklist(c *gin.Context) {
	var checklist Checklist
	if err := c.ShouldBindJSON(&checklist); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusUnprocessableEntity, gin.H{"Result": "Bad json", "err": err})
		return
	}
	card_id, _ := strconv.Atoi(c.Param("card_id"))
	checklist.CardId = card_id
	db.Create(&checklist)
	c.JSON(http.StatusOK, gin.H{"Checklist ID": checklist.ID})
}

func updateChecklist(c *gin.Context) {
	checklist_id, _ := strconv.Atoi(c.Param("checklist_id"))
	var checklist Checklist
	object := db.First(&checklist, checklist_id)
	var new_checklist Checklist
	if err := c.ShouldBindJSON(&new_checklist); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"Result": "Bad Parameter"})
		return
	}
	object.Update("Checked", new_checklist.Checked)
	c.JSON(http.StatusOK, gin.H{"Success": "Checklist updated"})
}

func deleteChecklist(c *gin.Context) {
	checklist_id, _ := strconv.Atoi(c.Param("checklist_id"))
	var checklist Checklist
	result := db.Find(&checklist, checklist_id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"Error": "Checklist not found", "checklist_id": checklist_id})
	} else {
		db.Delete(&checklist)
		c.JSON(http.StatusOK, gin.H{"Success": "Checklist deleted"})
	}
}

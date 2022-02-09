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
	} else {
		if new_card.Title != "" {
			object.Update("Title", new_card.Title)
		}
		if new_card.Body != "" {
			object.Update("Body", new_card.Body)
		}
		if new_card.BoardID != 0 {
			object.Update("BoardID", new_card.BoardID)
		}
		c.JSON(http.StatusOK, CardToJSON(card))
	}
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
	Card_id, _ := strconv.Atoi(c.Param("card_id"))
	Card, err := getCard(Card_id)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"Error": "Item not found"})
	} else {
		c.JSON(http.StatusOK, CardToJSON(Card))
	}
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
	c.JSON(http.StatusOK, gin.H{"Board ID": board.ID})
}

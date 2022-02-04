package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type M map[string]interface{}

func CardToJSON(Card Card) map[string]interface{} {
	return gin.H{"ID": Card.ID, "title": Card.Title, "body": Card.Body, "userID": Card.UserID}
}

func updateCard(c *gin.Context) {
	var new_Card Card
	var Card Card
	if err := c.ShouldBindJSON(&new_Card); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"Result": "Bad Parameter"})
		return
	}

	user_id, _ := c.Get("user_id")
	is_admin, _ := c.Get("is_admin")
	Card_id := c.Param("Card_id")
	object := db.First(&Card, Card_id)

	if object.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"Error": "Item not found"})
	} else if Card.UserID != int(user_id.(float64)) && !is_admin.(bool) {
		c.JSON(http.StatusUnauthorized, gin.H{"Error": "You can't update someone else Card"})
	} else {
		if new_Card.Title != "" {
			object.Update("Title", new_Card.Title)
		}
		if new_Card.Body != "" {
			object.Update("Body", new_Card.Body)
		}
		c.JSON(http.StatusOK, CardToJSON(new_Card))
	}
}

func deleteCard(c *gin.Context) {
	// Card_id, _ := strconv.Atoi(c.Param("Card_id"))
	// var Card Card

	// user_id, _ := c.Get("user_id")
	// is_admin, _ := c.Get("is_admin")

	// if err != nil {
	// 	c.JSON(http.StatusNotFound, gin.H{"Error": "Item not found"})
	// } else if !(verified_Card.UserID == int(user_id.(float64)) || is_admin.(bool)) {
	// 	c.JSON(http.StatusUnauthorized, gin.H{"Error": "You can't delete someone else Card"})
	// } else {
	// 	db.Delete(&Card, Card_id)
	// 	c.JSON(http.StatusOK, gin.H{"Success": "Item deleted"})
	// }
}

func getCardRoute(c *gin.Context) {
	// Card_id, _ := strconv.Atoi(c.Param("Card_id"))
	// Card, err := getCard(Card_id)

	// user_id, _ := c.Get("user_id")
	// is_admin, _ := c.Get("is_admin")

	// if err != nil {
	// 	c.JSON(http.StatusNotFound, gin.H{"Error": "Item not found"})
	// } else if Card.UserID != int(user_id.(float64)) && !is_admin.(bool) {
	// 	c.JSON(http.StatusUnauthorized, gin.H{"Error": "You can't see someone else Card"})
	// } else {
	// 	c.JSON(http.StatusOK, CardToJSON(Card))
	// }
}

func createCard(c *gin.Context) {
	var Card Card
	if err := c.ShouldBindJSON(&Card); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"Result": "Bad json"})
		return
	}
	user_id, _ := c.Get("user_id")
	Card.UserID = int(user_id.(float64))
	db.Create(&Card)
	c.JSON(http.StatusOK, CardToJSON(Card))
}

func getAllCards(c *gin.Context) {
	var Cards []Card
	db.Find(&Cards)
	var response []M

	user_id, _ := c.Get("user_id")
	is_admin, _ := c.Get("is_admin")

	for _, u := range Cards {
		if int(user_id.(float64)) == u.UserID || is_admin.(bool) {
			response = append(response, CardToJSON(u))
		}
	}
	c.JSON(http.StatusOK, response)
}

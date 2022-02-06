package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type SignUpInfo struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func getUser(user_name string) (User, error) {
	var user User
	if err := db.Where("username = ?", user_name).First(&user); err.Error != nil {
		return User{}, err.Error
	}

	return user, nil
}

func singup(c *gin.Context) {
	var input SignUpInfo
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"Result": "Bad Parameters"})
		return
	}
	user := User{Username: input.Username, Password: input.Password}
	db.Create(&user)
	c.JSON(http.StatusOK, gin.H{"ID": user.ID})
}

func login(c *gin.Context) {
	var u User
	if err := c.ShouldBindJSON(&u); err != nil {
		c.JSON(http.StatusUnprocessableEntity, "Invalid json provided")
		return
	}
	user, err := getUser(u.Username)

	if err != nil || u.Password != user.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"Result": "Please provide valid login details"})
		return
	}
	token, err := CreateJWTToken(user.ID)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, err.Error())
		return
	}
	c.JSON(http.StatusOK, gin.H{"token": BEARER_SCHEMA + token})
}

package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

const BEARER_SCHEMA = "Bearer "

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.Header("Access-Control-Allow-Origin", "*")
			c.JSON(http.StatusOK, "")
			return
		}
		c.Next()
	}
}

var db gorm.DB

func main() {
	// load env variables
	if err := godotenv.Load(".env"); err != nil {
		panic("Error loading .env file")
	}
	db = initDB()

	router := gin.Default()
	router.Use(CORSMiddleware())
	router.POST("/backend/login", login)
	router.POST("/backend/signup", singup)

	card_router := router.Group("/api/cards")
	card_router.Use(JWTMiddleware())
	card_router.GET("/", getAllCards)
	card_router.POST("/", createCard)
	card_router.GET("/:card_id", getCardRoute)
	card_router.PUT("/:card_id", updateCard)
	card_router.DELETE("/:card_id", deleteCard)

	router.Run()
}

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

	r := gin.Default()
	r.Use(CORSMiddleware())

	router := r.Group("/api")
	router.POST("/login", login)
	router.POST("/signup", singup)
	router.GET("/members", getMembers)

	board_router := router.Group("/boards")
	board_router.Use(JWTMiddleware())
	board_router.POST("/create", createBorad)
	board_router.GET("/:board_id/get", getBoardRoute)
	board_router.PUT("/:board_id/edit", updateBoard)
	board_router.DELETE("/:board_id/delete", deleteBoard)
	board_router.POST("/:board_id/add-member", addMembetToBoard)
	board_router.POST("/:board_id/remove-member", removeMembetFromBoard)
	board_router.GET("/:board_id/cards", getBoardCards)
	board_router.GET("/list", myBoards)

	card_router := router.Group("/cards")
	card_router.Use(JWTMiddleware())
	card_router.POST("/", createCard)
	card_router.GET("/:card_id", getCardRoute)
	card_router.PUT("/:card_id", updateCard)
	card_router.DELETE("/:card_id", deleteCard)
	card_router.POST("/:card_id/comments", addComment)
	card_router.DELETE("/:card_id/comments/:comment_id", deleteComment)
	card_router.POST("/:card_id/checklists", addChecklist)
	card_router.PUT("/:card_id/checklists/:checklist_id", updateChecklist)
	card_router.DELETE("/:card_id/checklists/:checklist_id", deleteChecklist)
	card_router.POST("/:card_id/add-member", addMembetToCard)
	card_router.POST("/:card_id/remove-member", removeMembetFromCard)

	card_router.GET("/list", getAllCards)

	r.Run()
}

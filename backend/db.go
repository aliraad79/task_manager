package main

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Board struct {
	gorm.Model
	Name string

	User []User `gorm:"many2many:user_boards;"`
}
type Card struct {
	gorm.Model
	Title string `json:"title" binding:"required"`
	Body  string `json:"body"`

	User []User `gorm:"many2many:user_cards;"`

	BoardID int `json:"boardID"`
	Board   Board
}

type User struct {
	gorm.Model
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func initDB() gorm.DB {

	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&Board{})
	db.AutoMigrate(&User{})
	db.AutoMigrate(&Card{})
	return *db
}

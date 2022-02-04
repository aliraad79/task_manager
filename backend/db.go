package main

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Card struct {
	gorm.Model
	Title  string `json:"title" binding:"required"`
	Body   string `json:"body" binding:"required"`
	UserID int
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
	db.AutoMigrate(&Card{})
	db.AutoMigrate(&User{})
	return *db
}

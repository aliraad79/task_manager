package main

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type WorkSpace struct {
	gorm.Model
	Name string

	User []User `gorm:"many2many:user_workspaces;"`
}

type Column struct {
	gorm.Model
	Name        string `json:"title" binding:"required"`
	WorkSpaceID int
	WorkSpace   WorkSpace
}

type Card struct {
	gorm.Model
	Title string `json:"title" binding:"required"`
	Body  string `json:"body" binding:"required"`

	User []User `gorm:"many2many:user_cards;"`

	ColumnID int
	Column   Column
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
	db.AutoMigrate(&WorkSpace{})
	db.AutoMigrate(&Column{})
	db.AutoMigrate(&User{})
	db.AutoMigrate(&Card{})
	return *db
}

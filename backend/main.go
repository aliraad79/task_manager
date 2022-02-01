package backend

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"gorm.io/gorm"
)

func main() {
	router := gin.Default()
	router.Run()
}

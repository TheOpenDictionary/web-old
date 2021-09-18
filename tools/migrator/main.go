package main

import (
	db "github.com/TheOpenDictionary/odict-web/tools/migrator/db"
	odict "github.com/TheOpenDictionary/odict/go"
)

func main() {
	client := db.NewClient()

	dict := odict.ReadDictionary("/Users/tnickerson/base/odict-web/eng-deu.odict")

	if err := client.Prisma.Connect(); err != nil {
		panic(err)
	}

	defer func() {
		if err := client.Prisma.Disconnect(); err != nil {
			panic(err)
		}
	}()

	for entry := range dict.Entries.Iterable {
		for 
		// if err := client.Prisma.CreateWord(k); err != nil {
		// 	panic(err)
		// }
	}

	// ctx := context.Background()
	// client.
	print("hi")
}

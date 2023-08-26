pub contract BugNFT {

    // Declare Path constants so paths do not have to be hardcoded
    // in transactions and scripts

    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let MinterStoragePath: StoragePath

    // Tracks the unique IDs of the NFT
    pub var idCount: UInt64

    // Declare the NFT resource type
    pub resource NFT {
        // The unique ID that differentiates each NFT
        pub let id: UInt64

        // String fields to hold bug information
        pub var name: String
        pub var image: String
        pub var height: Int

        // Initialize the fields in the init function
        init(initID: UInt64, initName: String, initImage: String, initHeight: Int) {
            self.id = initID
            self.name = initName
            self.image = initImage
            self.height = initHeight
        }
    }

    // We define this interface purely as a way to allow users
    // to create public, restricted references to their NFT Collection.
    // They would use this to publicly expose only the deposit, getIDs,
    // and idExists fields in their Collection
    pub resource interface NFTReceiver {

        pub fun deposit(token: @NFT)

        pub fun getIDs(): [UInt64]

        pub fun idExists(id: UInt64): Bool
    }

    // The definition of the Collection resource that
    // holds the NFTs that a user owns
    pub resource Collection: NFTReceiver {
        // dictionary of NFT conforming tokens
        // NFT is a resource type with an `UInt64` ID field
        pub var ownedNFTs: @{UInt64: NFT}

        // Initialize the NFTs field to an empty collection
        init () {
            self.ownedNFTs <- {}
        }

        // withdraw
        //
        // Function that removes an NFT from the collection
        // and moves it to the calling context
        pub fun withdraw(withdrawID: UInt64): @NFT {
            // If the NFT isn't found, the transaction panics and reverts
            let token <- self.ownedNFTs.remove(key: withdrawID)!

            return <-token
        }

        // deposit
        //
        // Function that takes a NFT as an argument and
        // adds it to the collections dictionary
        pub fun deposit(token: @NFT) {
            // add the new token to the dictionary with a force assignment
            // if there is already a value at that key, it will fail and revert
            self.ownedNFTs[token.id] <-! token
        }

        // idExists checks to see if a NFT
        // with the given ID exists in the collection
        pub fun idExists(id: UInt64): Bool {
            return self.ownedNFTs[id] != nil
        }

        // getIDs returns an array of the IDs that are in the collection
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }

    // creates a new empty Collection resource and returns it
    pub fun createEmptyCollection(): @Collection {
        return <-create Collection()
    }

    // mintNFT
    //
    // Function that mints a new Bug NFT with a new ID
    // and returns it to the caller
    pub fun mintBugNFT(name: String, image: String, height: Int): @NFT {

        // create a new Bug NFT
        var newNFT <- create NFT(
            initID: self.idCount,
            initName: name,
            initImage: image,
            initHeight: height
        )

        // change the id so that each ID is unique
        self.idCount = self.idCount + 1

        return <-newNFT
    }

	init() {
        self.CollectionStoragePath = /storage/bugNFTCollection
        self.CollectionPublicPath = /public/bugNFTCollection
        self.MinterStoragePath = /storage/bugNFTMinter

        // initialize the ID count to one
        self.idCount = 1

        // store an empty Collection in account storage
        self.account.save(<-self.createEmptyCollection(), to: self.CollectionStoragePath)

        // publish a reference to the Collection in storage
        self.account.link<&{NFTReceiver}>(self.CollectionPublicPath, target: self.CollectionStoragePath)
	}
}

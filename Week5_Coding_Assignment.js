class TargetWord {
constructor(word)   {
    this.word = word;
    }
}


class WordList{
    constructor(listName) {
        this.listName = listName; 
        this.targetWords = [];
    }

    addTargetWord(word) {
        if (word instanceof TargetWord) {
            this.targetWords.push(word);
        } else{
            throw new Error(`This is not a word: ${word}`);
        }
    }
}



class Menu{
    constructor() {
        this.wordLists = [];
        this.selectedWordList = null;
    }

    start(){
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createWordList();
                    break;
                case '2': 
                    this.viewWordList();
                    break;
                case '3': 
                    this.deleteWordList();
                    break;
                case '4': 
                    this.displayWordLists();
                    break;
                default: 
                    selection = 0; 
            }
            selection = this.showMainMenuOptions();
        }  

        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) create word list
            2) view word list
            3) delete word list
            4) display all word lists 
            `);         
    }

    showWordListMenuOptions(wordListInfo){
        return prompt(`
        0) back
        1) add target word
        2) delete target word
        ----------------------
        ${wordListInfo}

        `);
    }

    displayWordLists() {
        let wordListString = '';
        for (let i=0; i < this.wordLists.length; i++) {
            wordListString += i + ') ' + this.wordLists[i].listName + '\n';
        }
        alert(wordListString);
    }

    createWordList() {
        let listName = prompt(`Enter label for new word list:`);
        this.wordLists.push(new WordList(listName));
    }

    viewWordList() {
        let index = prompt(`Enter the index of the list you want to view:`);
        if(index > -1 && index < this.wordLists.length) {
            this.selectedWordList = this.wordLists[index];
            let description = `List Name: ` + this.selectedWordList.listName + '\n';

            for (let i = 0; i < this.selectedWordList.targetWords.length; i++){
                description += i + ') ' + this.selectedWordList.targetWords[i].word + '\n';
            }

            let selection = this.showWordListMenuOptions(description);
            switch (selection) {
                case '1': 
                this.createTargetWord();
                break;
                case '2': 
                this.deleteTargetWord(); 
            }
        }
    }

    deleteWordList() {
        let index = prompt('Enter the index of the word list you wish to delete: ');
        if (index > -1 && index < this.wordLists.length) {
            this.wordLists.splice(index,1);
        }
    }

    createTargetWord(){
        let word = prompt (`Enter new target word: `);
        this.selectedWordList.targetWords.push(new TargetWord(word));
    }

    deleteTargetWord() {
        let index = prompt(`Enter the index of the target word you wish to delete: `);
        if (index > -1 && index < this.selectedWordList.targetWords.length) {
            this.selectedWordList.targetWords.splice(index,1);
        }
    }
}

let menu = new Menu();
menu.start(); 
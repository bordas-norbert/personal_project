
export class Trie {
    public ALPH_SIZE: number = 26;
    private root: Node;

    constructor() {
        this.root = new Node(' ');
    }

    insert(word: string): void {
        if(word == null) return;

        let current = this.root;
        for(let ch of word) {
            if(!current.hasChild(ch))
                current.addChild(ch)
            current = current.getChild(ch) as Node;
        }
        current.isEndOfWord = true;     
    }
    contains(word: string): boolean {
        if(word == null) return false;
        let current = this.root;
        for(let ch of word){
            if(!current.hasChild(ch))
                return false;

            current = current.getChild(ch) as Node;
        }
        return true;
    }
    toremove(word: string): void{
        if(word === null) return;
        this.remove(this.root, word, 0);
    }

    private remove(root: Node, word: string, index: number):void {
        if(index === word.length){
            root.isEndOfWord = false;
            return;
        }

        let ch = word[index]
        let child = root.getChild(ch)
        if (child === null) return;

        this.remove(child as Node, word, index+1)

        if(!child?.hasChildren() && !child?.isEndOfWord)
            root.removeChild(ch)

    }
    private findWords(root: Node, prefix: string, words:Array<string>)
    {
        if (root == null) return;

        if(root.isEndOfWord)
            words.push(prefix)

        for(let child of root.getChildren())
            this.findWords(child, prefix + child.value, words)
    }

    public findAllWords(prefix: string) :Array<string> 
    {
        let words: Array<string> = []
        let lastNode = this.findLastNodeOf(prefix)
        this.findWords(lastNode as Node, prefix, words);
        return words;
    }
    private findLastNodeOf(prefix: string): Node | undefined
    {
        if(prefix == null)
            return undefined;
        let current = this.root

        for(let ch of prefix)
        {
            let child = current.getChild(ch)
            if(child == null)
                return undefined
            current = child;
        }
        return current
    }       
}
class Node {
    public value: string = "";
    private children = new Map<string, Node>();
    public isEndOfWord: boolean = false;

    constructor(value: string) {
        this.value = value
    }

    toString(): string {
        return 'value= ' + this.value;
    }

    hasChild(ch: string): boolean {
        return this.children.has(ch);
    }

    addChild(ch: string): void {
        this.children.set(ch, new Node(ch));
    }

    removeChild(ch: string): void {
        this.children.delete(ch);
    }

    getChild(ch: string): Node | undefined {
        return this.children.get(ch);
    }

    getChildren(): IterableIterator<Node> {
        return this.children.values();
    }

    hasChildren(): boolean {
        return this.children.size !== 0;
    }
}

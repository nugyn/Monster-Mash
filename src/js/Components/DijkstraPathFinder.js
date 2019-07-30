import Global from '../Global';
import hashids from 'hashids';

class Node {
    constructor(x,y, parent) {
        this._id = hashids.encode(x,y);
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.visited = false;
        this.neighbour = [];
        this.shortestPaths = new Object();
        getCost();
    }

    getCost() {
        if(this.parent) {
            this.size = this.parent.cost + 1;
        } else {
            this.size = 0;
        }
    }
    getCoordinate() {
        return new Object({ x:this.x, y:this.y });
    }

    addNeighbour(node) {
        this.neighbour.push(node);
    }

    getUnvisitedNeighbour() {
        return this.neighbour.filter(each => !each.visited);
    }
};

export class DijkstraPathFinder {
    constructor(start, destination) {
        this.start = start;
        this.destination = destination;
    }

    scanAround(node) {
        let c = coordinate.x;
        let r = coodinate.y;

        if(this.isPassible(r+1, c) && this.notCollideParent(r + 1, c, node)){
            let neighbour = new Node(r + 1, c);
            node.addNeighbour(neighbour);
        }
        else if(this.isPassible(r, c + 1) && this.notCollideParent(r, c + 1, node)){
            let neighbour = new Node(r, c + 1);
            node.addNeighbour(neighbour);
        }
        else if(this.isPassible(r - 1, c) && this.notCollideParent(r - 1, c, node)){
            let neighbour = new Node(r - 1, c);
            node.addNeighbour(neighbour);
        }
        else if(this.isPassible(r, c - 1) && this.notCollideParent(r, c - 1, node)){
            let neighbour = new Node(r, c - 1);
            node.addNeighbour(neighbour);
        }

    }

    isPassible(r, c){
        let limit = Global.getLimit();
        let sizeR = limit.x;
        let sizeC = limit.y;
        return r >= 0 && r < sizeR && c >= 0 && c < sizeC;
    }
    
    notCollideParent(r, c, sourceNode){
        return sourceNode.parent == null ||
        (sourceNode.parent.x != c && sourceNode.parent.y != r);
    }

    shortestPathFrom(goal) {
        let shortestPath = new Object();
        let currNode = new Node(this.x, this.y);
        while(currNode !== null && !currNode.visited) {
            currNeighBours = currNode.getUnvisitedNeighbour();
            if(this.explorable(node)) {};
        }
    }

    explorable(node) {
        /* @desc: Find if the path is shorter than what we currently have.
         * @return: true is shorter, also replace with the new path.
         *          false if longer.
         */
        let currNode = node;
        const currPath = [];

        try { 
            let currSize = this.shortestPaths[currNode._id].length;
            if(currNode.size < currSize) {
                while(currNode.parent) {
                    currPath.push(currNode.getCoordinate());
                }
                currPath.push(currNode.getCoordinate());
                this.shortestPaths[node._id] = currPath;
                return true;
            } else {
                return false;
            }
        } catch (e) {

        }
    }
}
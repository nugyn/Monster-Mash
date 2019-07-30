import Global from '../Global';
import Hashids from 'hashids';

export class Node {
    constructor(x,y, parent) {
        this._id =  new Hashids().encode(x,y);
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.visited = false;
        this.neighbour = [];
        this.getCost();
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

    removeNeighbour(node) {
        this.neighbour = this.neighbour.filter(item => item !== node);
    }
};

export class DijkstraPathFinder {
    constructor(start, destination) {
        this.start = start;
        this.destination = destination;
        this.shortestPaths = new Object();
        this.shortestPathFrom(destination);
    }

    scanAround(node) {
        let c = node.x;
        let r = node.y;

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

        return node.getUnvisitedNeighbour();

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
        let currNode = new Node(this.x, this.y);
        while(currNode && !currNode.visited) {
            let currNeighBours = currNode.getUnvisitedNeighbour();
            if(this.explorable(currNode) && this.isNotDestination(currNode) || currNeighBours && currNeighBours.length > 0) {
                let unvisited = this.scanAround(currNode);
                try{
                    currNode = unvisited[0];
                } catch (e) {
                    // If no children left to visit, go back to the parent.
                    currNode = currNode.parent;
                }
            } else {
                if(currNode.parent) {
                    currNode.parent.removeNeighbour(currNode);
                }
                currNode.visited = true;
                currNode = currNode.parent;
            }
        }
        console.log(this.shortestPaths);
        return this.shortestPaths;
    }

    isNotDestination(node) {
        return node._id !== this.destination._id;
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
                    currNode = currNode.parent;
                }
                currPath.push(currNode.getCoordinate());
                this.shortestPaths[node._id] = currPath;
                return true;
            } else {
                return false;
            }
        } catch (e) {
            /* if not in the dictionary */
            while(currNode.parent) {
                currPath.push(currNode.getCoordinate());
                currNode = currNode.parent;
            }
            currPath.push(currNode.getCoordinate());
            this.shortestPaths[node._id] = currPath;
            return true;
        }
    }
}
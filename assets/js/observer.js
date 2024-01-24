class Subject {
    observerFunctions = [];

    constructor(offset=0, limit=5) {
        this.offset = offset;
        this.limit = limit;
    }

    registerObserverFunction(observerFunction) {
        this.observerFunctions.push(observerFunction);
    }

    removeObserverFunction(observerFunction) {
        let index = this.observerFunctions.indexOf(observerFunction);
        delete this.observerFunctions[index];
    }

    notifyObservers() {
        this.observerFunctions.forEach(
            (observerFunction) => observerFunction(this.offset, this.limit)
        );
    }
}
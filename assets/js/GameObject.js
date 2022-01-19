class GameObject {
    constructor(config) {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "assets/images/characters/people/hero_francois.png",
        });

        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;
    }

    mount(map) {
        console.log("mounting")
        this.isMounted = true;
        map.addWall(this.x, this.y);

        //If we have a behavior, kick of after a short delay
        setTimeout(() => {
            this.doBehaviorEvent(map);
        }, 10)
    }

    update() {

    }

    async doBehaviorEvent(map) {

        //Ne rien faire si évenement plus important en cours
        if (map.isCutscenePlaying || this.behaviorLoop.length === 0) {
            return;
        }

        //Configuration de l'event avec les infos utiles
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        //Création de l'instance d'event a partir de la config d'événement suivant
        const eventHandler = new OverworldEvent({ map, event: eventConfig });
        await eventHandler.init(); 
        //Await fonctionne avec async et permet d'attendre que l'action requise soit finie pour passer a la suite

        //Lancer l'évenement suivant
        this.behaviorLoopIndex += 1;
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0;
        }

        this.doBehaviorEvent(map);
    }
}
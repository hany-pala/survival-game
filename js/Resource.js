import MatterEntity from './MatterEntity.js';
import DropItem from './DropItem.js';
export default class Resource extends MatterEntity {
  static preload(scene) {
    scene.load.atlas('resources', 'assets/images/resources.png', 'assets/images/resource_atlas.json');
    scene.load.audio('tree', 'assets/audio/tree.mp3');
    scene.load.audio('bush', 'assets/audio/tree.mp3');
    scene.load.audio('rock', 'assets/audio/rock.wav');
    scene.load.audio('pickup', 'assets/audio/pickup.mp3');
  }
  
  constructor(data) {
    let { scene, resource } = data; 
    let drops = JSON.parse(resource.properties.find(p => p.name == 'drops').value);
    let depth = resource.properties.find(p => p.name == 'depth').value;
    super({ scene, x: resource.x, y: resource.y, texture: 'resources', frame: resource.type, drops, depth, health: 5, name: resource.type })
    // super(scene.matter.world, resource.x, resource.y, 'resources', resource.type);
    // this.scene.add.existing(this);
    console.log(resource.properties);
    let yOrigin = resource.properties.find(p => p.name == 'yOrigin').value;
    this.drops = JSON.parse(resource.properties.find(p => p.name == 'drops').value);
    console.log(this.drops)
    // this.name = resource.type;
    // this.health = 5;
    // this.sound = this.scene.sound.add(this.name);
    // this.x += this.width / 2;
    // this.y -= this.height / 2;
    // this.y = this.y + this.height * (yOrigin - 0.5);
    const { Bodies } = Phaser.Physics.Matter.Matter;
    var circleCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'collider' });
    this.setExistingBody(circleCollider);
    this.setStatic(true);
    this.setOrigin(0.5, yOrigin);
  }
  
  // get dead() {
  //   return this.health <= 0;
  // }
  
  // hit = () => {
  //   if (this.sound) this.sound.play();
  //   this.health--;
  //   console.log(`Hitting: ${this.name} Health: ${this.health}`, this.drops);
    
  //   if (this.dead) {
  //     this.drops.forEach(drop => new DropItem({ scene: this.scene, x: this.x, y: this.y, frame: drop }));
  //   }
  // }
}
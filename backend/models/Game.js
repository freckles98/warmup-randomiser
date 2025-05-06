class Game {
    constructor({ name, grades, classSize, category, description, equipment, funFactor }) {
      this.name = name;
      this.equipment = Array.isArray(equipment)
        ? equipment
        : equipment.split(',').map(item => item.trim());
      this.grades=grades;
      this.classSize=classSize;
      this.category=category;
      this.description=description;
      this.funFactor=funFactor;
    }
  }
  
  module.exports = Game;
  
  
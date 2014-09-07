/**
 * Basic method that apply to all objects will be placed here.
 * @constructor
 */
TowerDefense.Element = function () {

    /**
     * The unique id of the object
     */
    this.id = TowerDefense.elementCount++;

    /**
     * Type of the current object. e.g. TOWER or ENEMY. Can be used to handle special
     * actions.
     * @type {string}
     */
    this.type = '';

    this.material = {};
    this.geometry = {};
    this.meshTexture = ''; // Key with the texture. @see TowerDefense.meshTextures
    this.meshTextureSpec = null;
    this.meshTextureNormal = null;
    this.phongMaterial = false;
    this.receiveShadow = true;
    this.castShadow = true;
    this.meshObject = ''; // Key with object. @see TowerDefense.meshObjects

    this.materialEmissive = '0x000000';

    /**
     * Holds the 3D (Three) mesh
     */
    this.object = {};

    /**
     * Whether this object is selected or not
     * @type {boolean}
     */
    this.selected = false;

    /**
     * Whether the current object is selectable
     * @type {boolean}
     */
    this.selectable = false;

    /**
     * Holds the tween for animation
     * @type {{}}
     */
    this.tween = {};

}

TowerDefense.Element.prototype = {

    /**
     * Creates the three.js mesh with this.material and this.geometry.
     */
    create: function() {

        if (this.meshObject != null && this.meshObject != '') {
            var refObject = TowerDefense.meshObjects[this.meshObject];
            this.geometry = refObject.object.geometry;
        }

        if (this.meshTexture != null && this.meshTexture != '') {
            var texture = TowerDefense.meshTextures[this.meshTexture];
            texture = texture.texture;
            var spec = null;
            if (this.meshTextureSpec != null) {
                spec = TowerDefense.meshTextures[this.meshTextureSpec];
                spec = spec.texture;
            }
            var normal = null;
            if (this.meshTextureNormal != null) {
                normal = TowerDefense.meshTextures[this.meshTextureNormal];
                normal = normal.texture;
            }
            if (this.phongMaterial == true && TowerDefense.settings.advancedMaterials == true) {
                this.material = new THREE.MeshPhongMaterial(
                  {
                      map: texture,
                      emissive: parseInt(this.materialEmissive),
                      specularMap: spec,
                      normalMap: normal,
                      shininess: 0
                  }
                );
            }
            else {
                this.material = new THREE.MeshLambertMaterial(
                  {
                      map: texture,
                      emissive: parseInt(this.materialEmissive),
                      specularMap: spec
                  }
                );
            }
        }

        this.geometry.computeVertexNormals();

        this.object = new THREE.Mesh( this.geometry, this.material );
        if (TowerDefense.settings.advancedLight == true && this.receiveShadow == true) {
            this.object.receiveShadow = true;
        }
        if (TowerDefense.settings.advancedLight == true && this.castShadow == true) {
            this.object.castShadow = true;
        }
        return this.object;

    },

    /**
     * Spawn the object into the game.
     */
    spawn: function() {

    },

    add: function () {

        return TowerDefense.__addObject(this);

    },

    remove: function () {

        TowerDefense.__removeObject(this);

    },

    update: function() {

    },

    /**
     * Logical callback after user clicked on this object
     */
    select: function() {

    },

    /**
     * Logical callback after object is deselected
     */
    deselect: function() {

    }

}

TowerDefense.elementCount = 0;


/**
 * @todo Some enemy Objects remove the tweens from other enemies/objects. Fix!
 */
TowerDefense.Element.prototype.removeTween = function() {

    TWEEN.remove(this.tween);

}
// Transition and styling functions

postdisplay['fadeIn-tex'] = function (taskName) {
    $('.fadeIn').hide().fadeIn(4000);
    // change 10000 to whatever time you want, in milliseconds
};

/* Enable outgoing opacity-based passage transitions. */
//config.passages.transitionOut = "opacity";

$('html').on('click', 
function(a){
	if (a.target.className == "link-internal") {
		var myDiv = document.getElementById('passages');
		myDiv.scrollTo(0, 0);
		console.log("test: ", a);
	}
});

////////Game Logic Helper Functions//////

function checkMaiDeath() {
	if(setup.death_saves_M >= setup.mai_death_threshold) {
		setup.mai_active = false;
		setup.mai_perished = true;
	}
}

//Handle character death counting

setup.death = function (character, encounter) {
	switch(character) {
    case 'Matt':
				console.log("matt death case");
        setup.matt_death_count++;
			  setup.most_recent_death = "Matt";
				setup.encounter_map.get(encounter).matt_deaths++;
        break;
    case 'Damian':
			  console.log("damian death case");
        setup.damian_death_count++;
			  setup.most_recent_death = "Damian";
				setup.encounter_map.get(encounter).damian_deaths++;
        break;
    case 'Saylin':
			  console.log("saylin death case");
        setup.saylin_death_count++;
			  setup.most_recent_death = "Saylin";
				setup.encounter_map.get(encounter).saylin_deaths++;
        break;
		case 'Aurakiir':
			  console.log("aurakiir death case");
        setup.aurakiir_death_count++;
			  setup.most_recent_death = "Aurakiir";
				setup.encounter_map.get(encounter).aurakiir_deaths++;
        break;
		default:
			  console.log("default death case");
				alert("Unhandled death case");
				break;
	}
	if(setup.aurakiir_revive && (character!='Aurakiir')) {
		console.log("aurakiir_save");
		setup.aurakiir_saves++;
	  return;
	}
	if(setup.mai_active) {
			console.log("mai_active");
			setup.death_saves_M++;
			checkMaiDeath();
	} else {
		  console.log("mai inactive death case");
			setup.death_saves_F++;
	}
}

////GLOBAL GAME VARIABLES///////

class Danger {
	constructor() {
		this.key = "";
		this.label = "";
		this.death_saves_F = 0;
		this.death_saves_M = 0;
		this.matt_deaths = 0;
		this.damian_deaths = 0;
		this.saylin_deaths = 0;
		this.aurakiir_deaths = 0;
		this.aurakiir_saves = 0;
		this.mai_died = false;
	}
}

class Encounter {
	constructor() {
		this.key = "";
		this.label = "";
		this.enemy_name = "";
		this.death_saves_F = 0;
		this.death_saves_M = 0;
		this.matt_deaths = 0;
		this.damian_deaths = 0;
		this.saylin_deaths = 0;
		this.aurakiir_deaths = 0;
		this.aurakiir_saves = 0;
		this.mai_died = false;
	}
	//methods
	deathCount() {
		return this.matt_deaths + this.saylin_deaths +
			this.aurakiir_deaths + this.damian_deaths;
	}
	toString() {
		return "Encounter: " + String(encounter_label);
	}
}

setup.encounter_map = new Map();

setup.newEncounter = function (encounterKey) {
	var encounter = new Encounter();
	encounter.key = encounterKey;
	encounter.label = encounterKey;
	setup.encounter_map.set(encounterKey, encounter);
	//setup.encounter_map.get(encounterKey).label = encounterKey;
	setup.cached_encounter = encounterKey;
}

/*
setup.encounterMostDeaths = function() {
	var max_deaths = 0;
	var max_encounter = "";
	setup.encounter_map.forEach(function(element){
		if(element.deathCount > max_deaths) {
			max_encounter = element.encounter_label;
			max_deaths = element.deathCount;
		}
	};)
	return max_encounter;
}
*/
//Primary Character Deaths
setup.death_saves_F = 0;
setup.death_saves_M = 0;
setup.matt_death_count = 0;
setup.damian_death_count = 0;
setup.saylin_death_count = 0;
setup.aurakiir_death_count = 0;
setup.most_recent_death = "";

setup.mai_active = false;
setup.mai_death_threshold = 2;

setup.mai_perished = false;

setup.cached_encounter = "";

// if this is true aurakiir prevents either m or f death save increase
setup.aurakiir_revive = true;
setup.aurakiir_saves = 0;

//Additional logic
setup.damian_killed_enemy = false;
setup.matt_insults_saylin_speech = false;






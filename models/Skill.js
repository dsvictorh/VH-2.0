var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Skill Model
 * ==========
 */

var Skill = new keystone.List('Skill', { 
	sortable: true,
});

Skill.add({
	name: { type: Types.Text, initial: true, max: 10, required: true },
	meterSkill1: { type: Types.Text, initial: true, max: 10, required: true },
	meterSkillPercentage1: { type: Types.Number, initial: true, min: 0, max: 100, required: true },
	meterSkill2: { type: Types.Text, initial: true, max: 10, required: true },
	meterSkillPercentage2: { type: Types.Number, initial: true, min: 0, max: 100, required: true },
	meterSkill3: { type: Types.Text, initial: true, max: 10, required: true },
	meterSkillPercentage3: { type: Types.Number, initial: true, min: 0, max: 100, required: true },
	extraSkillsTitle: { type: Types.Text, initial: true, max: 25, required: true },
	extraSkills: { type: Types.TextArray, default: []},
	description: { type: Types.Textarea, initial: true, max: 500, required: true },
});


/**
 * Registration
 */

Skill.defaultColumns = 'name, extraSkillsTitle, description';
Skill.register();

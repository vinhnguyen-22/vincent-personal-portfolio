import { type SchemaTypeDefinition } from 'sanity';

import { authorType } from './authorType';
import { blockContentType } from './blockContentType';
import { educationType } from './educationType';
import { projectType } from './projectType';
import { skillType } from './skillsType';
import { workExperienceType } from './workExperienceType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    authorType,
    educationType,
    projectType,
    skillType,
    workExperienceType,
  ],
};

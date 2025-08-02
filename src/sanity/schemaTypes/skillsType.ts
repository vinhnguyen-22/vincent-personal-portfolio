// skillType.js
import { defineType } from 'sanity';

export const skillType = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    { name: 'icon', title: 'Icon', type: 'image' },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Programming', value: 'programming' },
          { title: 'Data Engineering', value: 'data_engineering' },
          { title: 'Machine Learning', value: 'ml' },
          { title: 'Visualization/BI', value: 'visualization' },
          { title: 'Deployment/MLOps', value: 'deployment' },
        ],
      },
    },
    { name: 'order', title: 'Order', type: 'number' },
  ],
});

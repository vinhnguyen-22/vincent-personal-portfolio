import { UserIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'initials',
      title: 'Initials',
      type: 'string',
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'blockContent',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
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
        },
      ],
    },
    {
      name: 'tools',
      title: 'Tools',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'category', title: 'Category', type: 'string' },
            { name: 'icon', title: 'Icon', type: 'string' }, // có thể lưu tên icon, hoặc URL ảnh icon
          ],
        },
      ],
    },
    {
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'github', title: 'GitHub URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'twitter', title: 'Twitter/X URL', type: 'url' },
        { name: 'youtube', title: 'YouTube URL', type: 'url' },
        { name: 'email', title: 'Email', type: 'string' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'avatar',
    },
  },
});

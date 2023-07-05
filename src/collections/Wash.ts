import { CollectionConfig } from "payload/types";

const Wash: CollectionConfig = {
  slug: "wash",
  auth: false,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "id",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "address",
      type: "text",
      required: true,
    },
    {
      name: "phoneWash",
      type: "text",
    },
    {
      name: "images",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "posts",
      type: "array",
      fields: [
        {
          name: "id",
          type: "text",
        },
        {
          name: "number",
          type: "text",
        },
        {
          name: "active",
          type: "select",
          options: [
            {
              label: "Active",
              value: "True",
            },
            {
              label: "Not Active",
              value: "False",
            },
          ],
        },
      ],
      required: true,
    },
  ],
};

export default Wash;

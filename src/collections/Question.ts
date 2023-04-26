import { CollectionConfig } from "payload/types";

const Question: CollectionConfig = {
  slug: "question",
  auth: false,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "answer",
      type: "richText",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};

export default Question;

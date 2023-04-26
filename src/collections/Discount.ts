import { CollectionConfig } from "payload/types";

const Discount: CollectionConfig = {
  slug: "discount",
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
      name: "dateStart",
      type: "date",
    },
    {
      name: "dateEnd",
      type: "date",
    },
    {
      name: "description",
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

export default Discount;

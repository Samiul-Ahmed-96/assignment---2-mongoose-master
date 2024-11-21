import { model, Schema } from "mongoose";
import validator from "validator";
import { Address, FullName, Order, User } from "./user.interface";

const fullNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxlength: [20, "First name can not be more than 20 character"],
    // Custom validation
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: "{VALUE} is not a capitilize format",
    },
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    // Using validator library
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not supported",
    },
  },
});

const addressSchema = new Schema<Address>({
  street: {
    type: String,
    required: [true, "Street is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  country: {
    type: String,
    required: [true, "country is required"],
  },
});

const orderSchema = new Schema<Order>({
  productName: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Product quantity is required"],
  },
});

const userSchema = new Schema<User>({
  userId: {
    type: Number,
    required: [true, "User id is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  fullName: {
    type: fullNameSchema,
    required: [true, "Full name is required"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} is not supported",
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    default: [],
  },
  address: {
    type: addressSchema,
    required: [true, "Address is required"],
  },
  orders: {
    type: [orderSchema],
    default: [],
  },
});

export const UserModel = model<User>("User", userSchema);

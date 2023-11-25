import { z } from "zod";

  const userValidationSchema = z.object({
  
    userId: z.number(), // Added 'userId' property
    username: z.string().min(4).max(20),
    password: z.string().min(8),
    fullName: z.object({
      firstName: z.string().min(2).max(20),
      lastName: z.string().min(2).max(20),
    }),
    age: z.number().min(1).max(120),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: z.object({
      street: z.string().min(5),
      city: z.string().min(5),
      country: z.string().min(2).max(50),
    }),
    orders: z.array(
      z.object({
        productName: z.string().min(2).max(100),
        price: z.number().min(1),
        quantity: z.number().min(1),
      })
    ),
});

export default userValidationSchema;

import { model, Schema, Model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isValidPassword: Function;
  hashPassword: Function;

}

const userSchema: Schema<IUser> = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true }
});


userSchema.methods.hashPassword = async  function(password: string) {
  return await bcrypt.hash(password, 10);
}

userSchema.methods.isValidPassword  = async  function(password: string) {
  return await bcrypt.compare(password, this.password);
}

userSchema.pre("save", async function(next: () => void) {
  if(this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
   
  next();
})

const user: Model<IUser> = model('User', userSchema);
  
export default user;


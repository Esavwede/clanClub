import mongoose from "mongoose"; 
import bcrypt from "bcrypt" 
import config from "config" 


const Schema = mongoose.Schema 

// Interface 
export interface UserDocument extends mongoose.Document 
{
    firstname: string, 
    lastname: string, 
    email: string, 
    password: string,
    createdAt: Date, 
    updatedAt: Date, 
    comparePasswords(candidatePassword: string):Promise<boolean>
} 

const UserSchema  = new Schema 
            (
                {
                    firstname: 
                    {
                        type: String, 
                        trim: true,
                        required: true
                    },
                    lastname: 
                    {
                        type: String, 
                        trim: true, 
                        required: true
                    },
                    email: 
                    {
                        type: String, 
                        trim: true, 
                        required: true 
                    },
                    password: 
                    {
                        type: String, 
                        required: true 
                    }
                },
                {
                    timestamps: true 
                }
            )


UserSchema.pre("save", async function(next){
    const user = this as UserDocument 

    if( !user.isModified("password") )
    {
        return next() 
    }


    const saltWorkFactor = config.get<number>("saltWorkFactor")
    const salt = await bcrypt.genSaltSync(saltWorkFactor)
    const hash = await bcrypt.hashSync( user.password, salt )

    user.password = hash 
    return next() 

})


UserSchema.methods.comparePasswords = async function(candidatePassword: string):Promise<boolean>
{
    const user = this as UserDocument 
    return await bcrypt.compareSync(candidatePassword, user.password ) 
}


const User = mongoose.model('user', UserSchema)

export default User 
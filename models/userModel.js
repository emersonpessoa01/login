//responsavel por chamar o Banco de Dados
import mongooseDateFormat from "mongoose-date-format";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

export default (mongoose) => {
  const userSchema = mongoose.Schema(
    {
      name: String,
      email: String,
      password: String,
      type: {
        type: Number,
        default: 1,
      },

      created_at: { 
        type: Date, 
        required: true, 
        default: Date.now },
    },
    {
      timestamp: { boolean: true, required: true },
    }
  );

  /**criptografia de password*/
  userSchema.pre('save', function(next){
    let user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);

            user.password = hash;
            next();
        });
    });
});

  

  

  const userModel = mongoose.model("user", userSchema, "user"); //para criar user no singular
  userSchema.plugin(mongooseDateFormat);
  return userModel;
  
};

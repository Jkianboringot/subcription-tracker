import mongoose from "mongoose";

const subSchema = new mongoose.Schema(
  {
    //in here we are jus validating the data to meet a specific requirement
    //just like validation in laravel
    name: {
      type: String,
      required: [true, "Sub name is requiered"],
      trim: true, //remove space before and after
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "SUb Price is requiered"],
      min: [0, "price must be  greater then 0"],
    },

    currency: {
      type: String,
      enum: ["USD", "EUR", "PESO"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },

    category: {
      type: String,
      enum: [
        "News",
        "Sports",
        "Technology",
        "Business",
        "Entertainment",
        "Health",
        "Lifestyle",
        "Education",
      ],
      required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },

    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          value > this.startDate;
        },
        message: "renewal date must be after start date",
      },
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    }
  },
  { timestamps: true },
);

//auto-calculate if renewal date if its  missing

// what this does it if a renewalDate is not specified, we will take start a start date
//and frequency, and we use those two to calculate what is the next renewal date base on
//frequency, so let say we start at jan 1 and we have pick frequency of monthly, and we did not
//specify the renewal date, the system will take that start date add the frequency(monthly) to it
//so the renewalDate will become feb 1
subSchema.pre('save',function(next){
    if(!this.renewalDate){
        const renewalPeriods={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365
        };

        this.renewalDate=new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequency])
    }

    // auto update the status if renewal date has passed
    if(this.renewalDate < new Date()){
        this.status='expired'
    }


    next()
})

const Sub= mongoose.model('Sub',subSchema)


export default Sub; //what ever is pass here is what can be use in other file so in here 
//if we have v1 and v2 if we pass v1 that is the only one we can access unless we do {v1,v2}

//weird that this is craete in model in laravle this is in controller

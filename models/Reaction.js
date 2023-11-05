const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String, 
            required: true, 
            min_length: 1,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            
        }, 
        username: { 
            type: String, 
            required: true
        },
    },
    {
      toJSON: {
        getters: true
      },
      id: false
    }
)

module.exports = reactionSchema;
import { workflowClient } from "../config/upstash.js";
import Sub from "../models/sub.model.js";
import { SERVER_URL } from "../config/env.js";

export const getSubs = async (req, res, next) => {
  try {
    const subs = await Sub.find();

    res.status(200).json({ success: true, data: subs });
  } catch (error) {
    next(error);
  }
};

export const getSubById = async (req, res, next) => {
  try {
    const subs = await Sub.findById(req.params.id).select("-user"); //just for safety, and when
    //trying to find with id user findById

    //error validation is broken , thier is an error but its coming from db not here
    //     "succuss": false,
    // "error": "Resource not Found"
    //fix this
    if (!subs) {
      const error = new Error("Subs does not exist");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, data: subs });
  } catch (error) {
    next(error);
  }
};

export const createSub = async (req, res, next) => {
  try {
    const sub = await Sub.create({
      ...req.body,
      user: req.user._id,
    });
    // {url,body,headers,workflowRunId,retries}
    const {workflowRunId}=await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/sub/reminder`,
      body: { subId: sub.id },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    res.status(201).json({ success: true, data: {sub,workflowRunId}});
  } catch (e) {
    next(e);
  }
};

export const getUserSubs = async (req, res, next) => {
  try {
    // check if the user is the same as the on in the token
    if (req.user.id !== req.params.id) {
      const error = new Error("Your are not the owner of this account");
      error.status = 401;
      throw error;
    }

    const subs = await Sub.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subs });
  } catch (error) {
    next(error);
  }
};

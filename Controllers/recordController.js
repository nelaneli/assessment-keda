const moment = require("moment");
const db = require("../Models");

const Record = db.records;

const createRecord = async (req, res) => {
    try {
        const { type, vehicle_no } = req.body;
        const data = {
          type,
          vehicle_no,
          start_time: moment()
        };

        //saving the user
        const record = await Record.create(data);
        return res.status(200).send(record)
      } catch (error) {
        return res.status(400).send(error);
      }
}

const endRecord = async (req, res) => {
  // count total amount
  try {
      const record = await Record.update(
        {
          end_time: moment(),
          total_amount: 0
        },
        {
          where: {
            vehicle_no,
            end_time: null
          }
        }
      );
      return res.status(200).send(record)
    } catch (error) {
      return res.status(400).send(error);
    }
}

module.exports = {
    createRecord
}
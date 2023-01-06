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
  let get_record
  try {
    get_record = await Record.findOne(
      {
        where: {
          vehicle_no: req.body.vehicle_no,
          end_time: null
        },
        raw: true
      }
    )
  } catch (error) {
    return res.send(error)
  }
  console.log(get_record)

  let end_time = moment()
  let duration = moment.duration(end_time.diff(get_record.start_time));

  //Get Minutes
  let total_minutes = duration.asMinutes();
  console.log(total_minutes)

  // minute to hour
  let hours = Math.floor(total_minutes / 60);
  let minutes = total_minutes % 60;
  console.log(hours, minutes)

  // hour to day
  let days = Math.floor(hours / 24);
  hours = hours % 24;
  console.log(days, hours)

  let type = get_record.type;
  if(type != 'mobil' && type != 'motor'){
    return res.status(400).json({
      message: 'type harus mobil atau motor'
    })
  }

  let amount_per_hour = type == 'mobil' ? 5000 : 2000;
  let max_amount_per_day = type == 'mobil' ? 80000 : 40000;

  // count amount for hour, jika lebih dari maximum harian, maka dijadikan nilai max
  let total_amount_hour = hours * amount_per_hour;
  total_amount_hour = total_amount_hour >= (days * max_amount_per_day) ? (days * max_amount_per_day) : total_amount_hour;

  // count amount for days
  let total_amount_day = days * max_amount_per_day;

  // count amount for minutes
  let total_amount_minutes = 0
  if(minutes > 0){
    total_amount_minutes = amount_per_hour
  }

  // count total amount
  let total_amount = total_amount_day + total_amount_hour + total_amount_minutes

  try {
    const record = await Record.update(
      {
        end_time: moment(),
        total_amount,
      },
      {
        where: {
          id: get_record.id
        }
      }
    );
    return res.status(200).send(record)
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = {
    createRecord,
    endRecord
}
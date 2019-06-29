//export const URL_GET_ALL_FAILED_INSPECTIONS = "http://107.22.48.117:5000/tc-health-inspection/v1/failedfirstinspection"
export const URL_GET_ALL_FAILED_INSPECTIONS = "http://107.22.48.117:5000/fl-restaurant-inspection/v1/failedfirstinspection"
export const URL_GET_ALL_PASSED_INSPECTIONS = "http://107.22.48.117:5000/fl-restaurant-inspection/v1/passedfirstinspection"
export const URL_GET_ALL_INSPECTIONS = "http://107.22.48.117:5000/fl-restaurant-inspection/v1/allfirstinspection"
export const URL_GET_INSPECTION_DETAILS = "http://107.22.48.117:5000/fl-restaurant-inspection/v1/inspection-detail/"

export const URL_GET_ALL_FAILED_INSPECTIONS_TEST = "http://107.22.48.11:5000/tc-health-inspection/v1/failedfirstinspection"

export const ERROR_MSG_TIMEOUT = "We're sorry - an error occurred getting the data. Please check your data connection and try again."

export const INFO_MSG_LOADING_DATA = "Loading data, almost ready..."

export const CODES_DEFINITION = 
 [
    {
        code: 'COLW',
        key: '1',
        description: '† Approved source'
        },
        {
        code: 'COLX',
        key: '2',
        description: '† Original container: properly labeled, date marking, consumer advisory'
        },
        {
        code: 'COLY',
        key: '3',
        description: '† Time and Temperature Control – potentially hazardous/time/temperature control for safety foods (PH/TCS) '
        },
        {
        code: 'COLZ',
        key: '4',
        description: '* Facilities to maintain PH/TCS at the proper temperature'
        },
        {
        code: 'COLAA',
        key: '5',
        description: '* Food and food equipment thermometers provided and accurate'
        },
        {
        code: 'COLAB',
        key: '6',
        description: 'PH/TCS foods properly thawed'
        },
        {
        code: 'COLAC',
        key: '7',
        description: '† Unwrapped or PH/TCS food not re-served'
        },
        {
        code: 'COLAD',
        key: '8',
        description: '† Food protection, cross-contamination'
        },
        {
        code: 'COLAE',
        key: '9',
        description: '† Bare hand contact with RTE food; Alternative Operating Procedure (AOP)'
        },
        {
        code: 'COLAF',
        key: '10',
        description: 'In use food dispensing utensils properly stored'
        },
        {
        code: 'COLAG',
        key: '11',
        description: '† Employee health knowledge; ill/symptomatic employee present'
        },
        {
        code: 'COLAH',
        key: '12',
        description: '† Hands washed and clean, good hygienic practices, eating / drinking /smoking'
        },
        {
        code: 'COLAI',
        key: '13',
        description: 'Clean clothes; hair restraints; jewelry; painted/artificial fingernails'
        },
        {
        code: 'COLAJ',
        key: '14',
        description: 'Food-contact and nonfood-contact surfaces designed, constructed, maintained, installed, located'
        },
        {
        code: 'COLAL',
        key: '16',
        description: '* Dishwashing facilities; chemical test kit(s); gauges'
        },
        {
        code: 'COLAQ',
        key: '21',
        description: 'Wiping cloths; clean and soiled linens; laundry facilities'
        },
        {
        code: 'COLAR',
        key: '22',
        description: '† Food-contact surfaces clean and sanitized'
        },
        {
        code: 'COLAS',
        key: '23',
        description: 'Non-food contact surfaces clean'
        },
        {
        code: 'COLAT',
        key: '24',
        description: 'Storage/handling of clean equipment, utensils; air drying'
        },
        {
        code: 'COLAU',
        key: '25',
        description: 'Single-service and single-use items'
        },
        {
        code: 'COLAW',
        key: '27',
        description: 'Water source safe, hot (100°F) and cold under pressure'
        },
        {
        code: 'COLAX',
        key: '28',
        description: '*Sewage and wastewater disposed properly'
        },
        {
        code: 'COLAY',
        key: '29',
        description: '*Plumbing installed and maintained; mop sink; water filters; backflow prevention'
        },
        {
        code: 'COLBA',
        key: '31',
        description: '†Hand wash sinks, hand washing supplies and hand wash sign'
        },
        {
        code: 'COLBB',
        key: '32',
        description: 'Bathrooms'
        },
        {
        code: 'COLBC',
        key: '33',
        description: 'Garbage and refuse; premises maintained '
        },
        {
        code: 'COLBE',
        key: '35',
        description: '* No presence or breeding of insects/rodents/pests; no live animals, outer openings protected from insects/pests, rodent proof.'
        },
        {
        code: 'COLBF',
        key: '36',
        description: 'Floors, walls, ceilings and attached equipment properly constructed and clean; rooms and equipment properly vented'
        },
        {
        code: 'COLBH',
        key: '38',
        description: 'Lighting provided as required; fixtures shielded or bulbs protected'
        },
        {
        code: 'COLBJ',
        key: '40',
        description: 'Employee personal belongings'
        },
        {
        code: 'COLBK',
        key: '41',
        description: '† Chemicals/toxic substances'
        },
        {
        code: 'COLBL',
        key: '42',
        description: 'Cleaning and maintenance equip'
        },
        {
        code: 'COLBM',
        key: '43',
        description: 'Complete separation from living/sleeping area/private premise; kitchen restricted – no unauthorized personnel'
        },
        {
        code: 'COLBO',
        key: '45',
        description: 'Fire extinguishing equipment (FOR REPORTING PURPOSES ONLY)'
        },
        {
        code: 'COLBP',
        key: '46',
        description: 'Exits not blocked or locked (FOR REPORTING PURPOSES ONLY)'
        },
        {
        code: 'COLBQ',
        key: '47',
        description: 'Electrical wiring/outlets in good repair (FOR REPORTING PURPOSES ONLY)'
        },
        {
        code: 'COLBR',
        key: '48',
        description: 'Gas appliances; boiler certificate current/posted (FOR REPORTING PURPOSES ONLY)'
        },
        {
        code: 'COLBS',
        key: '49',
        description: 'Flammable/combustible materials (FOR REPORTING PURPOSES ONLY)'
        },
        {
        code: 'COLBT',
        key: '50',
        description: '* Current license properly displayed'
        },
        {
        code: 'COLBU',
        key: '51',
        description: 'Other conditions sanitary and safe operation'
        },
        {
        code: 'COLBV',
        key: '52',
        description: '* Misrepresentation; misbranding'
        },
        {
        code: 'COLBW',
        key: '53',
        description: '† Food management certification valid / Employee training verification'
        },
        {
        code: 'COLBX',
        key: '54',
        description: 'Florida Clean Indoor Air Act'
        },
        {
        code: 'COLBY',
        key: '55',
        description: 'Automatic Gratuity Notice'
        }        
    ]

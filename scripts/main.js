import { getOfficers, useOfficers } from "./officers/OfficerProvider.js"
import { getCriminals, useCriminals } from "./criminals/CriminalProvider.js"
import { CriminalList } from "./criminals/CriminalList.js"
import { ConvictionSelect } from "./convictions/ConvictionSelect.js";

CriminalList();
ConvictionSelect();
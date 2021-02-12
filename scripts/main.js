import { getOfficers, useOfficers } from "./officers/OfficerProvider.js"
import { getCriminals, useCriminals } from "./criminals/CriminalProvider.js"
import { CriminalList } from "./criminals/CriminalList.js"
import { ConvictionSelect } from "./convictions/ConvictionSelect.js";
import { OfficerSelect } from "./officers/OfficerSelect.js";
import { NoteForm } from "./notes/NoteForm.js";
import { ShowNoteButton } from "./notes/ShowNotesButton.js";
import "./notes/NoteList.js"
import "./alibis/AlibiButtonListener.js"
import { ShowWitnessButton } from "./witnesses/WitnessButtonListener.js";
import { ShowFacilityButton } from "./facilities/DisplayFacilitiesButton.js";
import "./facilities/FacilityList.js"

CriminalList();
ConvictionSelect();
OfficerSelect();
NoteForm();
ShowNoteButton();
ShowWitnessButton();
ShowFacilityButton();
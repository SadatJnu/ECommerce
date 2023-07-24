app.controller('LISController', ['$scope', '$http', 'appMessage', '$filter', '$window', '$timeout', '$sce', function LISController($scope, $http, appMessage, $filter, $window, $timeout, $sce) {

    $scope.LisPatient = {};
    $scope.LisPatient.Id = 0;
    $scope.LisPatient.LisHematologys = [];
    $scope.GrowthType = [{ Name: "No Growth", Type: "No Growth" }, { Name: "Scanty", Type: "Scanty" }, { Name: "Moderate", Type: "Moderate" }, { Name: "Profuse", Type: "Profuse" }];
    $scope.Patient = {};
    $scope.BoiChemical = {};
    $scope.BoiChemical.Id = 0;
    $scope.BioChemicalResults = [];
    //$scope.BioChemicalResults.Note = "";
    $scope.UrineCheckbox = false;
    $scope.Serology = {};
    $scope.Serology.Id = 0;
    $scope.Serologys = [];
    $scope.LisTopReportPrintHeader = [];
    $scope.saveButtonDisable = true;

    $scope.PathologistFix = {};

    

    $scope.LabReportTopHeading = null;

    $scope.defaultLabTechnician = {};

    $scope.StoolOccultBloodTest = 'Not Done';
    $scope.StoolReducingSubstance = 'Not Done';

    $scope.Neutrophil = {};
    $scope.Neutrophil.TestName = "NEU";

    $scope.Lymphocyte = {};
    $scope.Lymphocyte.TestName = "LYM";

    $scope.Monocyte = {};
    $scope.Monocyte.TestName = "MON";

    $scope.Eosinophil = {};
    $scope.Eosinophil.TestName = "EOS";

    $scope.Basophil = {};
    $scope.Basophil.TestName = "BAS";
    $scope.bloodCsMassageDropdown = [];
    $scope.PrintedBy_Haematology = '';
    $scope.PrintedTime_Haematology = '';

    $scope.PrintedBy_BioChemical = '';
    $scope.PrintedTime_BioChemical = '';

    $scope.PrintedBy_Serology = '';
    $scope.PrintedTime_Serology = '';

    $scope.PrintedBy_Immunology = '';
    $scope.PrintedTime_Immunology = '';

    $scope.PrintedBy_Urine = '';
    $scope.PrintedTime_Urine = '';

    $scope.PrintedBy_Stool = '';
    $scope.PrintedTime_Stool = '';

    $scope.PrintedBy_Lab = '';
    $scope.PrintedTime_Lab = '';

    $scope.PrintedBy_Microbiology = '';
    $scope.PrintedTime_Microbiology = '';

    //=======Analyzer(Starts)===========
    $scope.HematologyAnalyzer = [];
    $scope.BioChemAnalyzer = [];
    $scope.SerologyAnalyzers = [];
    $scope.ImmunologyAnalyzers = [];
    $scope.UrineAnalyzers = [];
    $scope.StoolAnalyzers = [];
    $scope.LabAnalyzers = [];
    $scope.MicrobiologyAnalyzers = [];
    $scope.GetAllAnalyzer = function () {
        $http({
            method: "GET",
            url: "GetAllAnalyzer"
        }).success(function (response) {
            $scope.HematologyAnalyzer = response.HematologyAnalyzer;
            $scope.BioChemAnalyzer = response.BioChemAnalyzer;
            $scope.SerologyAnalyzers = response.SerologyAnalyzer;
            $scope.ImmunologyAnalyzers = response.ImmunologyAnalyzer;
            $scope.UrineAnalyzers = response.UrineAnalyzer;
            $scope.StoolAnalyzers = response.StoolAnalyzer;
            $scope.LabAnalyzers = response.LabAnalyzer;
            $scope.MicrobiologyAnalyzers = response.MicrobiologyAnalyzer;
        }).error(function (response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };
    $scope.GetAllAnalyzer();

    $scope.OnSelectHematologyAnalyzer = function (val) { 
        $scope.SelectedHematologyAnalyzerId = val.Id;
    }

    $scope.OnSelectBioChemAnalyzer = function (val) {
        $scope.SelectedBioChemAnalyzerId = val.Id;
    }

    $scope.OnSelectSerologyAnalyzer = function (val) {
        $scope.SelectedSerologyAnalyzerId = val.Id;
    }

    $scope.OnSelectImmunologyAnalyzer = function (val) {
        $scope.SelectedImmunologyAnalyzerId = val.Id;
    }

    $scope.OnSelectUrineAnalyzer = function (val) {
        $scope.SelectedUrineAnalyzerId = val.Id;
    }

    $scope.OnSelectStoolAnalyzer = function (val) {
        $scope.SelectedStoolAnalyzerId = val.Id;
    }

    $scope.OnSelectLabAnalyzer = function (val) {
        $scope.SelectedLabAnalyzerId = val.Id;
    }

    $scope.OnSelectMicrobiologyAnalyzer = function (val) {
        $scope.SelectedMicrobiologyAnalyzerId = val.Id;
    }

   

    //=======Analyzer(Ends)===========

    $scope.CheckedByList = [];
    $scope.MedicalTechologistList = [];
    $scope.GetAllLabTechologist = function () {
        $http({
            method: "GET",
            url: "GetAllLabTechologist"
        }).success(function (response) {
            $scope.CheckedByList = response.CheckedByList;
            $scope.MedicalTechologistList = response.MedicalTechologistList;
        }).error(function (response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };
    $scope.GetAllLabTechologist();

    $scope.OnSelectHematologyCheckedBy = function (val) {
        $scope.SelectedHematologyCheckedBySignId = val.Id;
    }
    $scope.OnSelectHematologyMedicalTechologistBy = function (val) {
        $scope.SelectedHematologyMedicalTechologistSignId = val.Id;
    }

    $scope.OnSelectBioChemCheckedBy = function (val) {
        $scope.SelectedBioChemCheckedBySignId = val.Id;
    }
    $scope.OnSelectBioChemMedicalTechologistBy = function (val) {
        $scope.SelectedBioChemMedicalTechologistSignId = val.Id;
    }

    $scope.OnSelectSerologyCheckedBy = function (val) {
        $scope.SelectedSerologyCheckedBySignId = val.Id;
    }
    $scope.OnSelectSerologyMedicalTechologistBy = function (val) {
        $scope.SelectedSerologyMedicalTechologistSignId = val.Id;
    }

    $scope.OnSelectImmunologyCheckedBy = function (val) {
        $scope.SelectedImmunologyCheckedBySignId = val.Id;
    }
    $scope.OnSelectImmunologyMedicalTechologistBy = function (val) {
        $scope.SelectedImmunologyMedicalTechologistSignId = val.Id;
    }

    $scope.OnSelectUrineCheckedBy = function (val) {
        $scope.SelectedUrineCheckedBySignId = val.Id;
    }
    $scope.OnSelectUrineMedicalTechologistBy = function (val) {
        $scope.SelectedUrineMedicalTechologistSignId = val.Id;
    }

    $scope.OnSelectStoolCheckedBy = function (val) {
        $scope.SelectedStoolCheckedBySignId = val.Id;
    }
    $scope.OnSelectStoolMedicalTechologistBy = function (val) {
        $scope.SelectedStoolMedicalTechologistSignId = val.Id;
    }

    $scope.OnSelectMicrobiologyCheckedBy = function (val) {
        $scope.SelectedMicrobiologyCheckedBySignId = val.Id;
    }
    $scope.OnSelectMicrobiologyMedicalTechologistBy = function (val) {
        $scope.SelectedMicrobiologyMedicalTechologistSignId = val.Id;
    }

    $scope.OnSelectLabCheckedBy = function (val) {
        $scope.SelectedLabCheckedBySignId = val.Id;
    }
    $scope.OnSelectLabMedicalTechologistBy = function (val) {
        $scope.SelectedLabMedicalTechologistSignId = val.Id;
    }


    $scope.setMiscTestId = function (x) {
        $scope.miscTestName = x;
        $scope.MISCReport.TestId = x.Id;
        $scope.GetMicroBioById();
    }
    $scope.clearMiscTestId = function () {
        $scope.miscTestName = null;
        $scope.MISCReport.TestId = 0;
    }

    $scope.OnSelectMicCheckedBy = function (val) {
        $scope.miscCheckedBySignId = val;
        $scope.MISCReport.CheckedBySignId = val.Id;
    }
    $scope.ClearMiscCheckedBySignId = function (val) {
        $scope.miscCheckedBySignId = null;
        $scope.MISCReport.CheckedBySignId = 0;
    }
    $scope.OnSelectMicMedicalTechologistBy = function (val) {
        $scope.miscMedicalTechologistSignId = val;
        $scope.MISCReport.MedicalTechologistSignId = val.Id;
    }
    $scope.ClearMicMedicalTechologistBy = function (val) {
        $scope.miscMedicalTechologistSignId = null;
        $scope.MISCReport.MedicalTechologistSignId = 0;
    }


    $scope.CompanyName = "";
    $scope.GetCompanyInfo = function () {
        $http({
            method: "GET",
            url: "/Pharmacy/SalesInvoice/GetCompanyInfo",

        }).success(function (response) {

            if (response) {
                $scope.CompanyName = response.CompanyName;
                if (response.CompanyName == "Zia Heart Foundation Hospital & Research Institute") {
                    // $scope.BloodCs = "Culture Showed no growth after 48 hours incubation.";

                }
                else {
                    // $scope.BloodCs = "The initial blood culture report is negative but detection process will continue for another 3 days. If the culture becomes positive you will be informed over telephone from our end.";
                }
                if (response.CompanyName == "THE BARAKAH HOSPITAL MADONPUR LTD.") {
                    $scope.WBCCast = "";
                    $scope.PusCellCast = "";
                    $scope.CellularCast = "";
                    $scope.Urates = "";
                    $scope.CalciumCarbonate = "";
                }
                else {
                    $scope.WBCCast = "NIL";
                    $scope.PusCellCast = "NIL";
                    $scope.CellularCast = "NIL";
                    $scope.Urates = "NIL";
                    $scope.CalciumCarbonate = "NIL";
                }

                if (response.CompanyName == "Prime Hospital Ltd.") {
                    $scope.LisPatient.LisHematologys.push($scope.Neutrophil);
                    $scope.LisPatient.LisHematologys.push($scope.Lymphocyte);
                    $scope.LisPatient.LisHematologys.push($scope.Monocyte);
                    $scope.LisPatient.LisHematologys.push($scope.Eosinophil);
                    $scope.LisPatient.LisHematologys.push($scope.Basophil);

                    //when pathologist not be selected
                    $scope.HematologyPathologistId = 1; 
                    $scope.BioChemicalPathologistId = 1;
                    $scope.SeroConsultantt = 1;
                    $scope.ImmunooConsultantt = 1;
                    $scope.UrinConsultantt = 1;
                    $scope.StoolConsultantt = 1;
                    $scope.LabConsultantt = 1;
                    $scope.MicroBioConsultantt = 1;
                }      

                if (response.CompanyName == "TMSS Medical College & Rafatullah Community Hospital")
                {
                    $scope.LisPatient.LisHematologys.push($scope.Neutrophil);
                    $scope.LisPatient.LisHematologys.push($scope.Lymphocyte);
                    $scope.LisPatient.LisHematologys.push($scope.Monocyte);
                    $scope.LisPatient.LisHematologys.push($scope.Eosinophil);
                    $scope.LisPatient.LisHematologys.push($scope.Basophil);
                }

                if ($scope.CompanyName == "Lubana General Hospital (Pvt.) Ltd.") {
                    $scope.bloodCsMassageDropdown = [
                        { Id: "", Text: "Select" },
                        { Id: "1", Text: "Culture has yielded the growth of Enterococcus spp.at 37ºC after 48 hours of incubation in aerobic condition." },
                        { Id: "2", Text: "Culture has yielded the growth of Salmonella typhi at 37ºC after 72 hours of incubation in aerobic condition." },
                        { Id: "3", Text: "Culture has yielded no growth at 37ºC after 48 hours of incubation in aerobic condition." },
                        { Id: "4", Text: "Culture has yielded no growth at 37ºC after 72 hours of incubation in aerobic condition." },
                        { Id: "5", Text: "Culture has yielded the growth of Candida spp. at 37ºC after 48 hours of incubation in aerobic condition." },
                        { Id: "6", Text: "Culture has yielded no bacterial pathogens at 37ºC after 48 hours of incubation in aerobic condition." },
                        { Id: "7", Text: "No Salmonella Shigella or Campylobacter is isolated at 37ºC after 48 hours of incubation in aerobic condition." },
                    ]
                }
                else if ($scope.CompanyName == "Pan Pacific Hospital, Training & Research Institute Ltd.") {
                    $scope.bloodCsMassageDropdown = [
                        { Id: "", Text: "Select" },
                        { Id: "1", Text: "The initial blood culture report is negative but detection process will continue for another 3 days. If the culture becomes positive you will be informed over telephone from our end." },
                        { Id: "2", Text: "Culture has yielded / no growth of any Bacteria. aerobically at 37°C for 120 hours." },
                        { Id: "3", Text: "Culture of Blood incubated at 37°C for 48 hours under aerobically in the pressents of O2 has yielded / growth of--" },
                        { Id: "4", Text: "Culture incubated under aerobically at 37°C for 72 hours has yielded growth of E.CoLI" },
                        { Id: "5", Text: "Culture incubated under aerobically at 37°C for 72 hours has yielded no growth" },
                        { Id: "6", Text: "Culture has yielded at 37°C for 24hours/72hrs aerobically. No Growth of Salmonella Shigella, Vibrio Cholerae, Esch.Coil or any bacteria after incubation (Serotyping not done)" },
                    ]
                }
                else {
                        $scope.bloodCsMassageDropdown = [
                            { Id: "", Text: "Select" },
                            { Id: "1", Text: "The initial blood culture report is negative but detection process will continue for another 3 days. If the culture becomes positive you will be informed over telephone from our end." },
                            { Id: "2", Text: "Culture has yielded / no growth of any Bacteria. aerobically at 37°C for 120 hours." },
                            { Id: "3", Text: "Culture of Blood incubated at 37°C for 48 hours under aerobically in the pressents of O2 has yielded / growth of--" },
                            { Id: "4", Text: "Culture incubated under aerobically at 37°C for 72 hours has yielded groth of E.CoLI" },
                            { Id: "4", Text: "Culture incubated under aerobically at 37°C for 72 hours has yielded no growth" },
                        ]
                }


            }
        }).error(function (response) {

        });
    };
    $scope.GetCompanyInfo();

    $scope.IsClickedHeamatology = 1;
    $scope.IsClickedBioChemical = 1;
    $scope.IsClickedHormone = 1;
    $scope.IsClickedUrine = 1;
    $scope.IsClickedStool = 1;
    $scope.IsClickedLabReport = 1;
    $scope.IsClickedMicrobiology = 1;
    $scope.IsClickedSerology = 1;

    $scope.particulars28 = "";
    $scope.particulars29 = "";
    $scope.particulars30 = "";

    $scope.particulars31 = "";
    $scope.particulars32 = "";

    $scope.particulars33 = "";
    $scope.particulars34 = "";
    $scope.particulars35 = "";
    $scope.particulars36 = "";

    $scope.particulars4 = "";
    $scope.particulars5 = "";

    $scope.particulars9 = "";
    $scope.particulars10 = "";
    $scope.particulars11 = "";

    $scope.particulars290 = "";
    $scope.particulars300 = "";


    $scope.Hormone = {};
    $scope.Hormone.Id = 0;
    $scope.Hormones = [];

    $scope.MicroBio = {};
    $scope.MicroBio.Id = 0;
    $scope.MicroBios = [];
    $scope.Interpritations = [];

    $scope.Culture = {}; // radio button
    $scope.microBioDdl = true; // for enable & disable Dropdowns for Growth.

    $scope.OtherCellName01 = true;
    $scope.OtherCellName02 = true;
    $scope.OtherCellName03 = true;

    $scope.LisTopReportPrintHeader = function () {
        $http({
            method: 'GET',
            url: '/LIS/Haematology/LisTopReportPrintHeader',
            dataType: 'json'

        }).success(function (response) {
            if (response.Success) {
                $scope.LisTopReportPrintHeader = response.data;
            }
        });
    };
    $scope.LisTopReportPrintHeader();

    $scope.SaveTopHeading = function () {
        $http({
            method: 'POST',
            url: "/LIS/Haematology/SaveTopHeading?heading=" + $scope.topHeadValue
        }).success(function (response) {
            if (response.Success) {
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': response.msg });
            }
        });
    };
    $scope.IsLabReportRemarks = false;
    $scope.SetLabReportRemarks = function () {
        if ($scope.IsLabReportRemarks == true) {
            $scope.LisPatient.LabRemarks = "COVID-19 Antigen test is a lateral flow immunochromatographic assay (Rapid test) intended for the qualitative detection of the nucleocapsid protein antigen from SARS-CoV-2 in nasopharyngeal or anterior nasal swab specimens directly collected from individuals who are either suspected of COVID-19 within first five days of symptom onset, or from individuals without symptoms or other epidemiological reasons to suspect COVID-19 when tested twice over two or three days with at least 24 hours and no more than 48 hours between tests.; Results are for the identification of the SARS-CoV-2 nucleocapsid protein antigen. The antigen is generally detectable in nasopharyngeal or anterior nasal swab specimens during the acute phase of coronavirus infection. Positive results indicate the presence of viral antigens, but the clinical correlation with patient history and other diagnostic information is necessary to determine infection status. Positive results do not rule out a bacterial infection or co-infection with other viruses. The agent detected may not be the definite cause of disease. Laboratories within the Bangladesh are required to report all results to the appropriate public health authorities.; Negative results should be treated as presumptive, and do not rule out SARS-CoV-2 infection and should not be used as the sole basis for treatment or patient management decisions, including infection control decisions. Negative results should be considered in the context of a patient’s recent exposures, history and the presence of clinical signs and symptoms consistent with COVID-19 and confirmed with a RT PCR assay, if necessary for patient management. ";
        }
        if ($scope.IsLabReportRemarks == false) {
            $scope.LisPatient.LabRemarks = "";
        }
    }
    $scope.ValueSettingList = [];
    //dropdown value for stool and urine
    $scope.GetAllValueSetting = function () {
        $http({
            method: 'GET',
            url: '/LIS/Haematology/GetAllValueSetting'
        }).success(function (response) {
            $scope.ValueSettingList = response;
            $scope.SetUrineDropdownValue();
            $scope.setStoolDropdownValue();
        });
    }
    $scope.GetAllValueSetting();

    $scope.SetUrineDropdownValue = function () {
        $scope.Quantity_Urine = [];
        $scope.Color_Urine = [];
        $scope.Appearance_Urine = [];
        $scope.Sediment_Urine = [];
        $scope.PhyExOther01_Urine = [];
        $scope.PhyExOther02_Urine = [];
        $scope.PhyExOther03_Urine = [];
        $scope.SpGravity_Urine = [];
        $scope.Reaction_Urine = [];
        $scope.KetoneBodies_Urine = [];
        $scope.BilePigment_Urine = [];
        $scope.Albumin_Urine = [];
        $scope.BenjonesProtein_Urine = [];
        $scope.Ph_Urine = [];
        $scope.Sugar_Urine = [];
        $scope.Urobilinogen_Urine = [];
        $scope.CheExOther01_Urine = [];
        $scope.ExPhosphate_Urine = [];
        $scope.BileSalt_Urine = [];
        $scope.CheExOther02_Urine = [];
        $scope.Nitrite_Urine = [];
        $scope.Bilirubin_Urine = [];
        $scope.Microalbomin_Urine = [];
        $scope.Ascorbic_Urine = [];
        $scope.Creatinine_Urine = [];
        $scope.SpecificGravity_Urine = [];
        $scope.PusCells_Urine = [];
        $scope.AmorphPhosphate_Urine = [];
        $scope.GranularCast_Urine = [];
        $scope.Epithelialcells_Urine = [];
        $scope.Mucus_Urine = [];
        $scope.HyalineCast_Urine = [];
        $scope.Rbc_Urine = [];
        $scope.Spermatozoa_Urine = [];
        $scope.MicExOther01_Urine = [];
        $scope.CalciumOxalate_Urine = [];
        $scope.TricomonasVaginails_Urine = [];
        $scope.MicExOther02_Urine = [];
        $scope.UricAcid_Urine = [];
        $scope.MicroOrganism_Urine = [];
        $scope.MicExOther03_Urine = [];
        $scope.TriplePhosphate_Urine = [];
        $scope.CellularCast_Urine = [];
        $scope.MicExOther04_Urine = [];
        $scope.WBCCast_Urine = [];
        $scope.Urates_Urine = [];
        $scope.YeastCells_Urine = [];
        $scope.PusCellCast_Urine = [];
        $scope.CalciumCarbonate_Urine = [];
        $scope.Candida_Urine = [];

        angular.forEach($scope.ValueSettingList, function (value, key) {
             //Urine Physical Examination
            if (value.GroupName == "URINE" && value.DropdownName == "Quantity") {
                $scope.Quantity_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Color") {
                $scope.Color_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Appearance") {
                $scope.Appearance_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Sediment") {
                $scope.Sediment_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "UPE-Other01") {
                $scope.PhyExOther01_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "UPE-Other02") {
                $scope.PhyExOther02_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "UPE-Other03") {
                $scope.PhyExOther03_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Sp.Gravity") {
                $scope.SpGravity_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Reaction") {
                $scope.Reaction_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Ketone Bodies") {
                $scope.KetoneBodies_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Bile Pigment") {
                $scope.BilePigment_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Albumin") {
                $scope.Albumin_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Bence Jones Protein") {
                $scope.BenjonesProtein_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "PH") {
                $scope.Ph_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Sugar") {
                $scope.Sugar_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Urobilinogen") {
                $scope.Urobilinogen_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "UCE-Other01") {
                $scope.CheExOther01_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Ex.Phosphate") {
                $scope.ExPhosphate_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Bile Salt") {
                $scope.BileSalt_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "UCE-Other02") {
                $scope.CheExOther02_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Nitrite") {
                $scope.Nitrite_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Bilirubin") {
                $scope.Bilirubin_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Microalbomin") {
                $scope.Microalbomin_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Ascorbic Acid") {
                $scope.Ascorbic_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Creatinine") {
                $scope.Creatinine_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Specific Gravity") {
                $scope.SpecificGravity_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Pus Cells") {
                $scope.PusCells_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Amorph Phosphate") {
                $scope.AmorphPhosphate_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Granular Cast") {
                $scope.GranularCast_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Epithelial cells") {
                $scope.Epithelialcells_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Mucus") {
                $scope.Mucus_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Hyaline Cast") {
                $scope.HyalineCast_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "RBC") {
                $scope.Rbc_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Spermatozoa") {
                $scope.Spermatozoa_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "UME-Other01") {
                $scope.MicExOther01_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Calcium Oxalate") {
                $scope.CalciumOxalate_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Tricomonas Vaginails") {
                $scope.TricomonasVaginails_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "UME-Other02") {
                $scope.MicExOther02_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Uric Acid") {
                $scope.UricAcid_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Micro Organism") {
                $scope.MicroOrganism_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "UME-Other03") {
                $scope.MicExOther03_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Triple Phosphate") {
                $scope.TriplePhosphate_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Cellular Cast") {
                $scope.CellularCast_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Bacteria") {
                $scope.MicExOther04_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "WBC Casts") {
                $scope.WBCCast_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Urates") {
                $scope.Urates_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Yeast Cells") {
                $scope.YeastCells_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Pus Cells Cast") {
                $scope.PusCellCast_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Calcium Carbonate") {
                $scope.CalciumCarbonate_Urine.push(value);
            }
            else if (value.GroupName == "URINE" && value.DropdownName == "Candida") {
                $scope.Candida_Urine.push(value);
            }
        });


        //Urine Physical Examination
        //$scope.Quantity_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Quantity" }));
        //$scope.Color_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Color" }));
        //$scope.Appearance_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Appearance" }));
        //$scope.Sediment_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Sediment" }));
        //$scope.PhyExOther01_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "UPE-Other01" }));
        //$scope.PhyExOther02_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "UPE-Other02" }));
        //$scope.PhyExOther03_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "UPE-Other03" }));
        //$scope.SpGravity_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Sp.Gravity" }));

        //Urine Chemical Examination
        //$scope.Reaction_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Reaction" }));
        //$scope.KetoneBodies_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Ketone Bodies" }));
        //$scope.BilePigment_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Bile Pigment" }));
        //$scope.Albumin_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Albumin" }));
        //$scope.BenjonesProtein_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Bence Jones Protein" }));
        //$scope.Ph_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Ph" }));
        //$scope.Sugar_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Sugar" }));
        //$scope.Urobilinogen_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Urobilinogen" }));
        //$scope.CheExOther01_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "UCE-Other01" }));
       // $scope.ExPhosphate_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Ex.Phosphate" }));
        //$scope.BileSalt_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Bile Salt" }));
       // $scope.CheExOther02_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "UCE-Other02" }));
        //$scope.Nitrite_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Nitrite" }));
        //$scope.Bilirubin_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Bilirubin" }));
        //$scope.Microalbomin_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Microalbomin" }));
        //$scope.Ascorbic_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Ascorbic Acid" }));
        //$scope.Creatinine_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Creatinine" }));
        //$scope.SpecificGravity_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Specific Gravity" }));

        //Uring Microscopic Examination
        //$scope.PusCells_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Pus Cells" }));
        //$scope.AmorphPhosphate_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Amorph Phosphate" }));
        //$scope.GranularCast_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Granular Cast" }));
        //$scope.Epithelialcells_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Epithelial cells" }));
        //$scope.Mucus_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Mucus" }));
        //$scope.HyalineCast_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Hyaline Cast" }));
        //$scope.Rbc_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Rbc" }));
        //$scope.Spermatozoa_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Spermatozoa" }));
        //$scope.MicExOther01_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "UME-Other01" }));
        //$scope.CalciumOxalate_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Calcium Oxalate" }));
        //$scope.TricomonasVaginails_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Tricomonas Vaginails" }));
        //$scope.MicExOther02_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "UME-Other02" }));
        //$scope.UricAcid_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Uric Acid" }));
        //$scope.MicroOrganism_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Micro Organism" }));
        //$scope.MicExOther03_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "UME-Other03" }));
        //$scope.TriplePhosphate_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Triple Phosphate" }));
        //$scope.CellularCast_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Cellular Cast" }));
        //$scope.MicExOther04_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "UME-Other04" }));
        //$scope.WBCCast_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "WBC Casts" }));
        //$scope.Urates_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Urates" }));
        //$scope.YeastCells_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Yeast Cells" }));
        //$scope.PusCellCast_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Pus Cells Cast" }));
        //$scope.CalciumCarbonate_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Calcium Carbonate" }));
        //$scope.Candida_Urine = ($filter('filter')($scope.ValueSettingList, { GroupName: "URINE", DropdownName: "Candida" }));
    }

    $scope.setStoolDropdownValue = function () {
        $scope.StoolConsistency_Stool = [];
        $scope.StoolBlood_Stool = [];
        $scope.StoolColor_Stool = [];
        $scope.PhyOther01_Stool = [];
        $scope.StoolMucus_Stool = [];
        $scope.PhyOther02_Stool = [];
        $scope.StoolHelminths_Stool = [];
        $scope.StoolOdour_Stool = [];
        $scope.StoolReaction_Stool = [];
        $scope.CheOther01_Stool = [];
        $scope.StoolOccultBloodTest_Stool = [];
        $scope.CheOther02_Stool = [];
        $scope.StoolReducingSubstance_Stool = [];
        $scope.CheOther03_Stool = [];
        $scope.StoolPusCells_Stool = [];
        $scope.StoolCystEHistolytica_Stool = [];
        $scope.StoolCharcotLyden_Stool = [];
        $scope.StoolEpithelialcells_Stool = [];
        $scope.StoolGlardiaLamblia_Stool = [];
        $scope.StoolCrystalsMucus_Stool = [];
        $scope.StoolRbc_Stool = [];
        $scope.StoolAscarisLumbricoides_Stool = [];
        $scope.StoolYeastCells_Stool = [];
        $scope.StoolVegetableCells_Stool = [];
        $scope.StoolHymenolepisNana_Stool = [];
        $scope.StoolMuscleFibers_Stool = [];
        $scope.StoolStarch_Stool = [];
        $scope.StoolMacroPhage_Stool = [];
        $scope.StoolFatDroplets_Stool = [];
        $scope.StoolCandida_Stool = [];
        $scope.StoolFatGlobule_Stool = [];
        $scope.MicOther01_Stool = [];
        $scope.StoolEhistolytica_Stool = [];
        $scope.MicOther02_Stool = [];
        $scope.StoolStarchGranules_Stool = [];
        $scope.Mucus_Stool = [];
        $scope.EColi_Stool = [];
        $scope.StoolCystGiardialamblia_Stool = [];
        $scope.CystEColi_Stool = [];
        $scope.Ankylostoma_Stool = [];
        $scope.StoolTrichuris_Stool = [];
        $scope.StrongStercoralis_Stool = [];

        angular.forEach($scope.ValueSettingList, function (value, key) {
            if (value.GroupName == "STOOL" && value.DropdownName == "Consistency") {
                $scope.StoolConsistency_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Blood") {
                $scope.StoolBlood_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Color") {
                $scope.StoolColor_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "SPE-Other01") {
                $scope.PhyOther01_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Mucus") {
                $scope.StoolMucus_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "SPE-Other02") {
                $scope.PhyOther02_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Helminths") {
                $scope.StoolHelminths_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Odour") {
                $scope.StoolOdour_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Reaction") {
                $scope.StoolReaction_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "SCE-Other01") {
                $scope.CheOther01_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Occult Blood Test (OBT)") {
                $scope.StoolOccultBloodTest_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "SCE-Other02") {
                $scope.CheOther02_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Reducing Substance") {
                $scope.StoolReducingSubstance_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "SCE-Other03") {
                $scope.CheOther03_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Pus Cells") {
                $scope.StoolPusCells_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Cyst of E.Histolytica") {
                $scope.StoolCystEHistolytica_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Charcot Lyden") {
                $scope.StoolCharcotLyden_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Epithelial cells") {
                $scope.StoolEpithelialcells_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Glardia Lamblia") {
                $scope.StoolGlardiaLamblia_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Crystals Mucus") {
                $scope.StoolCrystalsMucus_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "RBC") {
                $scope.StoolRbc_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Ascaris Lumbricoides") {
                $scope.StoolAscarisLumbricoides_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Yeast Cells") {
                $scope.StoolYeastCells_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Vegetable Cells") {
                $scope.StoolVegetableCells_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Hymenolepis Nana") {
                $scope.StoolHymenolepisNana_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Muscle Fibers") {
                $scope.StoolMuscleFibers_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Starch") {
                $scope.StoolStarch_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "MacroPhage") {
                $scope.StoolMacroPhage_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Fat Droplets") {
                $scope.StoolFatDroplets_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Candida") {
                $scope.StoolCandida_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Fat Globule") {
                $scope.StoolFatGlobule_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "SME-Other01") {
                $scope.MicOther01_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "E.Histolytica") {
                $scope.StoolEhistolytica_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "SME-Other02") {
                $scope.MicOther02_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Starch Granules") {
                $scope.StoolStarchGranules_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Mucus") {
                $scope.Mucus_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "E. Coli") {
                $scope.EColi_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Cyst Giardia lamblia") {
                $scope.StoolCystGiardialamblia_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Cyst of E. Coli") {
                $scope.CystEColi_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Ankylostoma Duodenale") {
                $scope.Ankylostoma_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Trichuris Trichura") {
                $scope.StoolTrichuris_Stool.push(value);
            }
            else if (value.GroupName == "STOOL" && value.DropdownName == "Strong Stercoralis") {
                $scope.StrongStercoralis_Stool.push(value);
            }
        });

        //Stool Physical Examination
        //$scope.StoolConsistency_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Consistency" }));
        //$scope.StoolBlood_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Blood" }));
        //$scope.StoolColor_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Color" }));
        //$scope.PhyOther01_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "SPE-Other01" }));
        //$scope.StoolMucus_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Mucus" }));
        //$scope.PhyOther02_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "SPE-Other02" }));
        //$scope.StoolHelminths_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Helminths" }));
        //$scope.StoolOdour_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Odour" }));

        //Stool Chemical Examination
        //$scope.StoolReaction_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Reaction" }));
        //$scope.CheOther01_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "SCE-Other01" }));
        //$scope.StoolOccultBloodTest_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Occult Blood Test (OBT)" }));
        //$scope.CheOther02_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "SCE-Other02" }));
        //$scope.StoolReducingSubstance_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Reducing Substance" }));
        //$scope.CheOther03_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "SCE-Other03" }));

        //Stool Microscopeic Examination
        //$scope.StoolPusCells_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Pus Cells" }));
        //$scope.StoolCystEHistolytica_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Cyst of E.Histolytica" }));
        //$scope.StoolCharcotLyden_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Charcot Lyden" }));
        //$scope.StoolEpithelialcells_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Epithelial cells" }));
        //$scope.StoolGlardiaLamblia_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Glardia Lamblia" }));
        //$scope.StoolCrystalsMucus_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Crystals Mucus" }));
        //$scope.StoolRbc_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "RBC" }));
        //$scope.StoolAscarisLumbricoides_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Ascaris Lumbricoides" }));
        //$scope.StoolYeastCells_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Yeast Cells" }));
        //$scope.StoolVegetableCells_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Vegetable Cells" }));
        //$scope.StoolHymenolepisNana_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Hymenolepis Nana" }));
        //$scope.StoolMuscleFibers_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Muscle Fibers" }));
        //$scope.StoolStarch_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Starch" }));
        //$scope.StoolMacroPhage_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "MacroPhage" }));
        //$scope.StoolFatDroplets_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Fat Droplets" }));
        //$scope.StoolCandida_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Candida" }));
        //$scope.StoolFatGlobule_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Fat Globule" }));
        //$scope.MicOther01_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "SME-Other01" }));
        //$scope.StoolEhistolytica_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "E.Histolytica" }));
        //$scope.MicOther02_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "SME-Other02" }));
        //$scope.MicOther02_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "SME-Other02" }));
        //$scope.StoolStarchGranules_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Starch Granules" }));
        //$scope.Mucus_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Mucus" }));
        //$scope.EColi_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "E. Coli" }));
        //$scope.StoolCystGiardialamblia_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Cyst Giardia lamblia" }));
        //$scope.CystEColi_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Cyst of E. Coli" }));
        //$scope.Ankylostoma_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Ankylostoma Duodenale" }));
        //$scope.StoolTrichuris_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Trichuris Trichura" }));
        //$scope.StrongStercoralis_Stool = ($filter('filter')($scope.ValueSettingList, { GroupName: "STOOL", DropdownName: "Strong Stercoralis" }));
    }

    $scope.ClearColonyCount = function () {
        $scope.Colony = null;
        $scope.Culture.ColonyCount = null;
    }
    $scope.ClearIncubation = function () {
        $scope.Incubation = null;
        $scope.Culture.Incubation = null;
    }


    $scope.OnSelectRbc1 = function (x) {
        $scope.Culture.RbC1 = x.Particular;
    }
    $scope.OnSelectPusCells1 = function (x) {
        $scope.Culture.PusCells1 = x.Particular;
    }
    $scope.OnSelectEpithelialcells1 = function (x) {
        $scope.Culture.EpithelialCells1 = x.Particular;
    }

    $scope.clearSelectRbc1 = function () {
        $scope.Culture.RbC1 = null;
    }
    $scope.clearSelectPusCells1 = function () {
        $scope.Culture.PusCells1 = null;
    }
    $scope.clearSelectEpithelialcells1 = function () {
        $scope.Culture.EpithelialCells1 = null;
    }

    $scope.setTestId = function (x) {
        $scope.TestId = x.Id;
        $scope.TestName = x.TestName;
    }

    $scope.TestId = 0;
    $scope.setTestId2 = function (x) {
        $scope.TestId = x.Id;
        $scope.GetMicroBioById();
    }

    $scope.OnSelectOrganismA = function (val) {
        $scope.Culture.OrganismIsolatedA = val.Particular;
    };

    $scope.OnSelectOrganismB = function (val) {
        $scope.Culture.OrganismIsolatedB = val.Particular;
    };
    $scope.OnSelectOrganismC = function (val) {
        $scope.Culture.OrganismIsolatedC = val.Particular;
    };


    $scope.ClearOrganismA = function () {
        $scope.Culture.OrganismIsolatedA = null;
    };

    $scope.ClearOrganismB = function () {
        $scope.Culture.OrganismIsolatedB = null;
    };
    $scope.ClearOrganismC = function () {
        $scope.Culture.OrganismIsolatedC = null;
    };


    $scope.clearTestId = function () {
        $scope.TestId = 0;
    }


    $scope.testNames = [];
    $scope.GetTestNamesByTestOrderId = function (x) {
        $scope.GetTestNamesByTestOrderId2(x);
        $http({
            method: 'GET',
            url: '/LIS/Haematology/GetTestNamesByTestOrderId/' + x,
            dataType: 'json'
        }).success(function (response) {
            debugger;
            if (response.Success) {
                $scope.testNames = response.data;
            }
        });
    };


    $scope.miscTestNames = [];
    $scope.GetMiscTestNamesByTestOrderId = function (x) {
        $http({
            method: 'GET',
            url: '/LIS/Haematology/GetMiscTestNamesByTestOrderId/' + x,
            dataType: 'json'
        }).success(function (response) {
            debugger;
            if (response.Success) {
                $scope.miscTestNames = response.data;
            }
        });
    };

    $scope.AllTests = [];
    $scope.HistoTestList = [];
    $scope.testStatus = "";
    $scope.GetTestNamesByTestOrderId2 = function (x) {
        $http({
            method: 'GET',
            url: '/LIS/Haematology/GetTestNamesByTestOrderId2/' + x,
            dataType: 'json'

        }).success(function (response) {
            if (response.Success) {
                $scope.AllTests = response.data;
                $scope.testStatus = response.testStatus;
                $scope.HistoTestList = $scope.AllTests.filter(function (item) {
                    return item.TestGroupId === 5;
                });
            }
        });
    };

    $scope.setTopHeadValue = function (x) {
        $scope.topHeadValue = x.Name;
    }
    $scope.ClearOrganism = function (x) {
        $scope.Organism = null;
        $scope.Culture.OrganismIsolated = null;
    }
    $scope.clearGrowthType = function () {
        $scope.Culture.GrowthType = null;
    }
    $scope.GrowthType = null;
    $scope.OnSelectGrowthType = function (x) {
        $scope.Culture.GrowthType = x.Particular;
    }
    $scope.LYM = {};
    $scope.LYM.TestName = "LYM%";
    $scope.LisPatient.LisHematologys.push($scope.LYM);

    $scope.HGB = {};
    $scope.HGB.TestName = "HGB";
    $scope.LisPatient.LisHematologys.push($scope.HGB);

    $scope.Other01 = {};
    $scope.Other01.TestName = "Other-01";
    $scope.LisPatient.LisHematologys.push($scope.Other01);

    $scope.Other02 = {};
    $scope.Other02.TestName = "Other-02";
    $scope.LisPatient.LisHematologys.push($scope.Other02);

    $scope.Other03 = {};
    $scope.Other03.TestName = "Other-03";
    $scope.LisPatient.LisHematologys.push($scope.Other03);

    $scope.ESR = {};
    $scope.ESR.TestName = "ESR";
    $scope.LisPatient.LisHematologys.push($scope.ESR);

    $scope.WBC = {};
    $scope.WBC.TestName = "WBC";
    $scope.LisPatient.LisHematologys.push($scope.WBC);

    $scope.PLT = {};
    $scope.PLT.TestName = "PLT";
    $scope.LisPatient.LisHematologys.push($scope.PLT);

    $scope.RDW = {};
    $scope.RDW.TestName = "RDW-CV";
    $scope.LisPatient.LisHematologys.push($scope.RDW);

    $scope.BT = {};
    $scope.BT.TestName = "BT";
    $scope.BTSecond = {};
    $scope.BTSecond.TestName = "BTSec";
    $scope.LisPatient.LisHematologys.push($scope.BT);
    $scope.LisPatient.LisHematologys.push($scope.BTSecond);

    $scope.NEU = {};
    $scope.NEU.TestName = "NEU%";
    $scope.LisPatient.LisHematologys.push($scope.NEU);

    $scope.RBC = {};
    $scope.RBC.TestName = "RBC";
    $scope.LisPatient.LisHematologys.push($scope.RBC);

    $scope.MPV = {};
    $scope.MPV.TestName = "MPV";
    $scope.LisPatient.LisHematologys.push($scope.MPV);

    $scope.CT = {};
    $scope.CT.TestName = "CT";
    $scope.LisPatient.LisHematologys.push($scope.CT);

    $scope.CTSecond = {};
    $scope.CTSecond.TestName = "CTSec";
    $scope.LisPatient.LisHematologys.push($scope.CTSecond);

    $scope.HCT = {};
    $scope.HCT.TestName = "HCT";
    $scope.LisPatient.LisHematologys.push($scope.HCT);

    $scope.PDW = {};
    $scope.PDW.TestName = "PDW";
    $scope.LisPatient.LisHematologys.push($scope.PDW);

    $scope.CE = {};
    $scope.CE.TestName = "C/E";
    $scope.LisPatient.LisHematologys.push($scope.CE);

    $scope.MON = {};
    $scope.MON.TestName = "MON%";
    $scope.LisPatient.LisHematologys.push($scope.MON);

    $scope.MCV = {};
    $scope.MCV.TestName = "MCV";
    $scope.LisPatient.LisHematologys.push($scope.MCV);

    $scope.MP = {};
    $scope.MP.TestName = "MP";
    $scope.LisPatient.LisHematologys.push($scope.MP);

    $scope.EC = {};
    $scope.EC.TestName = "EC";
    $scope.LisPatient.LisHematologys.push($scope.EC);

    $scope.EOS = {};
    $scope.EOS.TestName = "EOS%";
    $scope.LisPatient.LisHematologys.push($scope.EOS);

    $scope.MCH = {};
    $scope.MCH.TestName = "MCH";
    $scope.LisPatient.LisHematologys.push($scope.MCH);

    $scope.MPC = {};
    $scope.MPC.TestName = "MPC";
    $scope.LisPatient.LisHematologys.push($scope.MPC);

    $scope.RC = {};
    $scope.RC.TestName = "RC";
    $scope.LisPatient.LisHematologys.push($scope.RC);

    $scope.BAS = {};
    $scope.BAS.TestName = "BAS%";
    $scope.LisPatient.LisHematologys.push($scope.BAS);

    $scope.MCHC = {};
    $scope.MCHC.TestName = "MCHC";
    $scope.LisPatient.LisHematologys.push($scope.MCHC);

    $scope.PCT = {};
    $scope.PCT.TestName = "PCT";
    $scope.LisPatient.LisHematologys.push($scope.PCT);

    $scope.RDWSD = {};
    $scope.RDWSD.TestName = "RDW-SD";
    $scope.LisPatient.LisHematologys.push($scope.RDWSD);

    $scope.PLCR = {};
    $scope.PLCR.TestName = "P-LCR";
    $scope.LisPatient.LisHematologys.push($scope.PLCR);

    $scope.IG = {};
    $scope.IG.TestName = "IG%";
    $scope.LisPatient.LisHematologys.push($scope.IG);




   

    $scope.LisPatient.TotalDc = 0;
    $scope.Checkedids = [];

    $scope.bloodMessageCheckbox == false;
    $scope.ShowNoteForBloodCS = function () {
        if ($scope.bloodMessageCheckbox == true) {
            if ($scope.CompanyName == "Zia Heart Foundation Hospital & Research Institute") {
                $scope.BloodCs = "Culture Showed no growth after 48 hours incubation.";

            }
            else {
                $scope.BloodCs = "The initial blood culture report is negative but detection process will continue for another 3 days. If the culture becomes positive you will be informed over telephone from our end.";
            }
        }
        else {
            $scope.BloodCs = "";
        }
    }
    $scope.restoreLastStoredPathologist = function () {
        
        var lastHematologyTechnician = $.cookie("lastHematologyTechnician");
        if (lastHematologyTechnician != null) {
            $scope.HematoPathologist = JSON.parse(lastHematologyTechnician);
        }

        var lastBioChemicalTechnician = $.cookie("lastBioChemicalTechnician");
        if (lastBioChemicalTechnician != null) {
            $scope.BioChemicalPathologist = JSON.parse(lastBioChemicalTechnician);
        }

        var lastSerologyTechnician = $.cookie("lastSerologyTechnician");
        if (lastSerologyTechnician != null) {
            $scope.seroPathologist = JSON.parse(lastSerologyTechnician);
        }

        var lastImmunologyTechnician = $.cookie("lastImmunologyTechnician");
        if (lastImmunologyTechnician != null) {
            $scope.ImmunoPathologist = JSON.parse(lastImmunologyTechnician);
        }

        var lastUrineTechnician = $.cookie("lastUrineTechnician");
        if (lastUrineTechnician != null) {
            $scope.UrinPathologist = JSON.parse(lastUrineTechnician);
        }

        var lastStoolTechnician = $.cookie("lastStoolTechnician");
        if (lastStoolTechnician != null) {
            $scope.StoolPathologist = JSON.parse(lastStoolTechnician);
        }

        var lastLabReportTechnician = $.cookie("lastLabReportTechnician");
        if (lastLabReportTechnician != null) {
            $scope.LabPathologist = JSON.parse(lastLabReportTechnician);
        }

        var lastMicroBilogyTechnician = $.cookie("lastMicroBilogyTechnician");
        if (lastMicroBilogyTechnician != null) {
            $scope.MicroBiologyPathologist = JSON.parse(lastMicroBilogyTechnician);
        }
    };

    $scope.FilterTestGroups = [];
    //======CheckBoxDefine(Start)============
    //$scope.HGBChecked = true;
    //$scope.Other01Checked = true;
    //$scope.Other02Checked = true;
    //$scope.Other03Checked = true;
    //$scope.ESRChecked = true;
    //$scope.WBCChecked = true;
    //$scope.PLTChecked = true;
    //$scope.RDWChecked = true;
    //$scope.BTChecked = true;
    //$scope.NEUChecked = true;
    //$scope.RBCChecked = true;
    //$scope.MPVChecked = true;
    //$scope.CTChecked = true;
    //$scope.LYMChecked = true;
    //$scope.HCTChecked = true;
    //$scope.PDWChecked = true;
    //$scope.CEChecked = true;
    //$scope.MONChecked = true;
    //$scope.MCVChecked = true;
    //$scope.MPChecked = true;
    //$scope.ECChecked = true;
    //$scope.EOSChecked = true;
    //$scope.MCHChecked = true;
    //$scope.MPCChecked = true;
    //$scope.RCChecked = true;
    //$scope.BASChecked = true;
    //$scope.MCHCChecked = true;
    //$scope.PCTChecked = true;
    //$scope.RDWSDChecked = true;
    //$scope.PLCRChecked = true;
    //$scope.IGChecked = true;
    //======CheckBoxDefine(End)=================

    //=====================
    //$scope.Color = '0';
    //====================

    $scope.DetailTemp = {};
    $scope.alerts = [];
    $scope.appMessage = appMessage;
    $scope.ActionStatus = "Add";
    $scope.WorkOrders = [];

    // Set Order Id While Update this Id

    var paramId = location.search.substr(4);
    $scope.LisPatient.Id = paramId;

    //=========================== Alerts ==================

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    //========= Set Date when page load
    $scope.SetInitialValue = function () {

        $("input[name=TestOrdId]").focus();
        $("input[name=TestOrdId]").select();
        $http({
            method: "GET",
            url: "/LIS/Haematology/GetCurrentUserName"
        }).success(function (response) {
            $scope.AddedBy = response;
        }).error(function (response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    }
    $scope.SetInitialValue();
    //========= Set Date when page load



    // Enter Key Handaling..........
    //Enter key Event
    //Every field focus on after on 
    $scope.changeFocus = function (fieldName) {
        var field = document.getElementsByName(fieldName);
        field[0].focus();
        field[0].select();
    };

    //Add details data press enter from Product Dropdown
    $scope.addAndChangeFocus = function (fieldName) {
        if ($scope.ActionStatus == 'Add') {
            $scope.AddProductDetailToList();
            $("input[name=" + fieldName + "]").focus();
            $("input[name=" + fieldName + "]").select();
        } else if ($scope.ActionStatus == 'Edit') {

        }
    };

    //Ctrl + Enter = Submit from last focus field
    $scope.changeFocusOnSaveButton = function (event, fieldName) {
        event.preventDefault();
        var field = document.getElementsByName(fieldName);
        $('.' + fieldName).removeClass('btn-success');
        $('.' + fieldName).addClass('btn-danger');
        field[0].focus();
        field[0].select();
    };
    //End Enter key.........

    // For Functional Key(Starts)...!
    //Biochemistry Part...!
    $scope.OnPressBioF2 = function (data) {
        var index = $scope.BioChemicalResults.indexOf(data);
        $scope.BioChemicalResults[index].TestResult = '( + )';

    };
    $scope.OnPressBioF3 = function (data) {
        var index = $scope.BioChemicalResults.indexOf(data);
        $scope.BioChemicalResults[index].TestResult = '( ++ )';

    };
    $scope.OnPressBioF4 = function (data) {
        var index = $scope.BioChemicalResults.indexOf(data);
        $scope.BioChemicalResults[index].TestResult = '( +++ )';

    };
    $scope.OnPressBioF6 = function (data) {
        var index = $scope.BioChemicalResults.indexOf(data);
        $scope.BioChemicalResults[index].TestResult = 'Nil';

    };
    $scope.OnPressBioF7 = function (data) {
        var index = $scope.BioChemicalResults.indexOf(data);
        $scope.BioChemicalResults[index].TestResult = 'Not Supplied';

    };
    $scope.OnPressBioF8 = function (data) {
        var index = $scope.BioChemicalResults.indexOf(data);
        $scope.BioChemicalResults[index].TestResult = 'Green';

    };
    $scope.OnPressBioF9 = function (data) {
        var index = $scope.BioChemicalResults.indexOf(data);
        $scope.BioChemicalResults[index].TestResult = 'Gr. Yellow';

    };
    $scope.OnPressBioF10 = function (data) {
        var index = $scope.BioChemicalResults.indexOf(data);
        $scope.BioChemicalResults[index].TestResult = 'Yellow';

    };
    $scope.OnPressBioCtrl = function (data) {
        var index = $scope.BioChemicalResults.indexOf(data);
        $scope.BioChemicalResults[index].TestResult = 'Orange';

    };
    $scope.OnPressBioAlt = function (data) {
        var index = $scope.BioChemicalResults.indexOf(data);
        $scope.BioChemicalResults[index].TestResult = 'Brick Red';

    };

    $scope.findPathologistName = function (consultantName, consultantId, PathologistIdSearch) {
        var id = Number(PathologistIdSearch);
        var selectedItem = ($filter('filter')($scope.Consultants, { Id: id }, true));

        if (selectedItem.length > 0) {
            $scope[consultantId] = selectedItem[0].Id;
            $scope[consultantName] = selectedItem[0].ConsultantName;

        }
        //else {
        //    $scope[consultantId] = null;
        //    $scope[consultantName] = null;

        //}

    };



    $scope.setUrineFunctionsValue = function (modelName, functionKey) {
        $scope[modelName] = $scope[modelName];
        if (functionKey == 113) {   //F2
            $scope[modelName] = '(+)';
        }
        else if (functionKey == 115) { //F4
            $scope[modelName] = '(++)';
        }
        else if (functionKey == 118) { //F7
            $scope[modelName] = '(+++)';
        }
        else if (functionKey == 119) { //F8
            $scope[modelName] = 'Nil';
        }
        else if (functionKey == 120) { //F9
            $scope[modelName] = 'Trace';
        }
    }

    //$scope.OnPressUrineF2ForSinglePlus1 = function () {
    //    $scope.Color = '(+)';
    //};

    //$scope.OnPressUrineF3ForDoublePlus1 = function () {
    //    $scope.Color = '(++)';
    //};

    //$scope.OnPressUrineF4ForThreePlus1 = function () {
    //    $scope.Color = '(+++)';
    //};
    //$scope.OnPressUrineF6ForNil1 = function () {
    //    $scope.Color = 'Nil';
    //};

    //Serology Part...!
    $scope.OnPressSeroF2 = function (data) {
        var index = $scope.Serologys.indexOf(data);
        
        if ($scope.CompanyName == "INSAF BARAKAH KIDNEY & GENERAL HOSPITAL") {
            $scope.Serologys[index].SerologyResult = "Positive";
        }
        else
        {
            $scope.Serologys[index].SerologyResult = "'A' (+ve)";
        }
    };
    $scope.OnPressSeroF3 = function (event, data) {
        event.preventDefault();
        var index = $scope.Serologys.indexOf(data);
        if ($scope.CompanyName == "INSAF BARAKAH KIDNEY & GENERAL HOSPITAL") {
            $scope.Serologys[index].SerologyResult = "Negative";
        }
        else {
            $scope.Serologys[index].SerologyResult = "'A' (-ve)";
        }
    };
    $scope.OnPressSeroF4 = function (data) {
        var index = $scope.Serologys.indexOf(data);
        if ($scope.CompanyName == "INSAF BARAKAH KIDNEY & GENERAL HOSPITAL") {
            $scope.Serologys[index].SerologyResult = "Reactive";
        }
        else {
            $scope.Serologys[index].SerologyResult = "'B' (+ve)";
        }
    };
    $scope.OnPressSeroF6 = function (event, data) {
        event.preventDefault();
        var index = $scope.Serologys.indexOf(data);
        if ($scope.CompanyName == "INSAF BARAKAH KIDNEY & GENERAL HOSPITAL") {
            $scope.Serologys[index].SerologyResult = "Non-reactive";
        }
        else {
            $scope.Serologys[index].SerologyResult = "'B' (-ve)";
        }
    };
    $scope.OnPressSeroF7 = function (data) {
        var index = $scope.Serologys.indexOf(data);
        if ($scope.CompanyName == "INSAF BARAKAH KIDNEY & GENERAL HOSPITAL") {
            $scope.Serologys[index].SerologyResult = "Not detected";
        }
        else {
            $scope.Serologys[index].SerologyResult = "'AB' (+ve)";
        }
    };

    $scope.OnPressSeroF8 = function (data) {
        var index = $scope.Serologys.indexOf(data);
        $scope.Serologys[index].SerologyResult = "'AB' (-ve)";
    };
   
    $scope.OnPressSeroF9 = function (data) {
        var index = $scope.Serologys.indexOf(data);
        $scope.Serologys[index].SerologyResult = "'O' (+ve)";
    };
    $scope.OnPressSeroF10 = function (event, data) {
        event.preventDefault();
        var index = $scope.Serologys.indexOf(data);
        $scope.Serologys[index].SerologyResult = "'O' (-ve)";
    };
    $scope.OnPressSeroCtrl = function (data) {
        var index = $scope.Serologys.indexOf(data);
        $scope.Serologys[index].SerologyResult = "Positive";
    };
    $scope.OnPressSeroAlt = function (event, data) {
        event.preventDefault();
        var index = $scope.Serologys.indexOf(data);
        $scope.Serologys[index].SerologyResult = "Negative";
    };

    //Lab Reports  part..
    $scope.OnPressLabExamResultF2 = function (data) {
        var index = $scope.LabExamResults.indexOf(data);
        $scope.LabExamResults[index].TestResult = 'Positive';
    };
    $scope.OnPressLabExamResultF3 = function (event, data) {
        event.preventDefault();
        var index = $scope.LabExamResults.indexOf(data);
        $scope.LabExamResults[index].TestResult = 'Negative';
    };

    //Immunoogy Part...!
    $scope.OnPressImmunoF2 = function (data) {
        var index = $scope.Hormones.indexOf(data);
        $scope.Hormones[index].HormoneResult = 'Positive';
    };
    $scope.OnPressImmunoF3 = function (event, data) {
        event.preventDefault();
        var index = $scope.Hormones.indexOf(data);
        $scope.Hormones[index].HormoneResult = 'Negative';
    };
    $scope.OnPressImmunoF4 = function (data) {
        var index = $scope.Hormones.indexOf(data);
        $scope.Hormones[index].HormoneResult = 'Reactive';
    };
    $scope.OnPressImmunoF6 = function (event, data) {
        event.preventDefault();
        var index = $scope.Hormones.indexOf(data);
        $scope.Hormones[index].HormoneResult = 'Non-reactive';
    };
    $scope.OnPressImmunoF7 = function (data) {
        var index = $scope.Hormones.indexOf(data);
        $scope.Hormones[index].HormoneResult = 'Not detected';
    };





    //Urin-R/E...!
    $scope.OnPressUrineF2 = function () {
        //var index = $scope.LISUrinExamResultDetails.indexOf(data);
        //$scope.LISUrinExamResultDetails[index].Result = '( + )';
        //angular.forEach($scope.LISUrinExamResultDetails, function (item) {
        //    if (item.ParticularIdentityNo = 'U11') {
        //        document.getElementsByName(item.ParticularIdentityNo)[0].value = '( + )';
        //    }
        //});

    };
    $scope.OnPressUrineF3 = function () {
        //var index = $scope.LISUrinExamResultDetails.indexOf(data);
        //$scope.LISUrinExamResultDetails[index].Result = '( ++ )';
        //angular.forEach($scope.LISUrinExamResultDetails, function (item) {
        //    if (item.ParticularIdentityNo = 'U11') {
        //        document.getElementsByName(item.ParticularIdentityNo)[0].value = '( ++ )';
        //    }
        //});

    };
    $scope.OnPressUrineF4 = function () {
        //var index = $scope.LISUrinExamResultDetails.indexOf(data);
        //$scope.LISUrinExamResultDetails[index].Result = '( +++ )';
        //angular.forEach($scope.LISUrinExamResultDetails, function (item) {
        //    if (item.ParticularIdentityNo = 'U11') {
        //        document.getElementsByName(item.ParticularIdentityNo)[0].value = '( +++ )';
        //    }
        //});

    };
    $scope.OnPressUrineF6 = function (data) {
        //var index = $scope.LISUrinExamResultDetails.indexOf(data);
        //$scope.LISUrinExamResultDetails[index].Result = 'Nill';

        //angular.forEach($scope.LISUrinExamResultDetails, function (item) {
        //var index = $scope.LISUrinExamResultDetails.indexOf(item);
        //$scope.LISUrinExamResultDetails[index].Result = 'Nill';

        //if (item.ParticularIdentityNo = 'U11') {
        //    document.getElementsByName(item.ParticularIdentityNo)[0].value = 'Nil';
        //}
        //if (item.ParticularIdentityNo = 'U12') {
        //    document.getElementsByName(item.ParticularIdentityNo)[0].value = 'Nil';
        //}

        //});

    };
    $scope.OnPressUrineF7 = function () {
        //var index = $scope.LISUrinExamResultDetails.indexOf(data);
        //$scope.LISUrinExamResultDetails[index].Result = 'Trace';

        //angular.forEach($scope.LISUrinExamResultDetails, function (item) {
        //    if (item.ParticularIdentityNo = 'U11') {
        //        document.getElementsByName(item.ParticularIdentityNo)[0].value = 'Trace';
        //    }
        //});

    };



    // For Functional Key(Ends)...!



    //================================================= Zahid Part ========================================================
    $scope.TestOrderIdLoadDate = new Date();
    $scope.printButtonDisable = true;

    $scope.LISUrinExamResult = {};
    $scope.examParticulars = [];
    $scope.LISUrinExamResultDetails = [];

    $scope.LISStoolExamResult = {};
    $scope.stoolExamParticulars = [];
    $scope.LISStoolExamResultDetails = [];

    $scope.LabExamResults = [];
    $scope.LabExamResult = {};

    $scope.GetAllLISUrinExamParticulars = function () {
        $http({
            method: "GET",
            url: "/LIS/Haematology/GetAllLISUrinExamParticulars"
        }).success(function (response) {
            $scope.examParticulars = response;
        }).error(function (response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };
    $scope.GetAllLISUrinExamParticulars();

    $scope.HaematologyMachineNames = {};
    $scope.GetAllHaematologyMachineNames = function () {
        $http({
            method: "GET",
            url: "/LIS/Haematology/HaematologyMachineNames"
        }).success(function (response) {
            $scope.HaematologyMachineNames = response;
        }).error(function (response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };
    $scope.GetAllHaematologyMachineNames();

    $scope.ImmunologyMachineNames = {};
    $scope.GetImmunologyMachineNames = function () {
        $http({
            method: "GET",
            url: "/LIS/Haematology/ImmunologyMachineNames"
        }).success(function (response) {
            $scope.ImmunologyMachineNames = response;
        }).error(function (response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };
    $scope.GetImmunologyMachineNames();





    $scope.UrineMachineNames = {};
    $scope.GetUrineMachineNames = function () {
        $http({
            method: "GET",
            url: "/LIS/Haematology/UrineMachineNames"
        }).success(function (response) {
            $scope.UrineMachineNames = response;
        }).error(function (response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };
    $scope.GetUrineMachineNames();

    $scope.BiochemestryMachineNames = {};
    $scope.GetAllBiochemestryMachineNames = function () {
        $http({
            method: "GET",
            url: "/LIS/Haematology/BiochemestryMachineNames"
        }).success(function (response) {
            $scope.BiochemestryMachineNames = response;
        }).error(function (response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };
    $scope.GetAllBiochemestryMachineNames();

    $scope.SerologyMachineNames = {};
    $scope.GetAllSerologyMachineNames = function () {
        $http({
            method: "GET",
            url: "/LIS/Haematology/SerologyMachineNames"
        }).success(function (response) {
            $scope.SerologyMachineNames = response;
        }).error(function (response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };
    $scope.GetAllSerologyMachineNames();

    $scope.GetAllLISStoolExamParticulars = function () {
        $http({
            method: "GET",
            url: "/LIS/Haematology/GetAllLISStoolExamParticulars"
        }).success(function (response) {
            $scope.stoolExamParticulars = response;
        }).error(function (response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };
    $scope.GetAllLISStoolExamParticulars();

    // Lis Urin exam result save here
    $scope.SaveUrinExamResult = function myFunction() {
        debugger;
        $scope.submitted = true;
        if ($scope.frmUrine.$invalid) {
            return;
        }
        $scope.LISUrinExamResultDetails = [];

        var x = document.getElementById("frmUrine");

        for (var i = 0; i < x.length; i++) {

            var intputFieldName = x[i].name;

            var index = $scope.examParticulars.findIndex(x => x.ParticularIdentityNo === intputFieldName);
            if (index != -1) {
                var particulars = $scope.examParticulars[index].Particulars || null;
                var OtherParticulars = "";

                //$scope.particulars28 = "UPE-Other01";
                //$scope.particulars29 = "UPE-Other02";
                //$scope.particulars30 = "UPE-Other03";

                //$scope.particulars31 = "UCE-Other01";
                //$scope.particulars32 = "UCE-Other02";

                //$scope.particulars33 = "UME-Other01";
                //$scope.particulars34 = "UME-Other02";
                //$scope.particulars35 = "UME-Other03";
                //$scope.particulars36 = "UME-Other04";

                if (index == 28) {
                    OtherParticulars = $scope.particulars28;
                    particulars = "UPE-Other01";
                }
                else if (index == 29) {
                    OtherParticulars = $scope.particulars29;
                    particulars = "UPE-Other02";
                }
                else if (index == 30) {
                    OtherParticulars = $scope.particulars30;
                    particulars = "UPE-Other03";
                }
                else if (index == 31) {
                    OtherParticulars = $scope.particulars31;
                    particulars = "UCE-Other01";
                }
                else if (index == 32) {
                    OtherParticulars = $scope.particulars32;
                    particulars = "UCE-Other02";
                }
                else if (index == 33) {
                    OtherParticulars = $scope.particulars33;
                    particulars = "UME-Other01";
                }
                else if (index == 34) {
                    OtherParticulars = $scope.particulars34;
                    particulars = "UME-Other02";
                }
                else if (index == 35) {
                    OtherParticulars = $scope.particulars35;
                    particulars = "UME-Other03";
                }
                else if (index == 36) {
                    OtherParticulars = $scope.particulars36;
                    particulars = "Bacteria";
                }
                var urinHeadingId = $scope.examParticulars[index].UrinHeadingId || 0;
                var particularResult = x.elements[i].value || null;
                var ParticularIdentityNo = $scope.examParticulars[index].ParticularIdentityNo || null;
                var serialNo = $scope.examParticulars[index].SerialNo || null;
            }

            if (particulars != null && particularResult != null) {

                $scope.LISUrinExamResultDetails.push({
                    'SerialNo': serialNo,
                    'UrinHeading': urinHeadingId,
                    'Particulars': particulars,
                    'OtherParticulars': OtherParticulars,
                    'Result': particularResult,
                    'ParticularIdentityNo': ParticularIdentityNo
                });
                particulars = null;
                particularResult = null;
                ParticularIdentityNo = null;
            }
        }


        ////new added strat
        //debugger
        //$scope.CopiedTempArray = [];
        //angular.copy($scope.LISUrinExamResultDetails, $scope.CopiedTempArray);

        //angular.forEach($scope.CopiedTempArray, function (item) {
        //    if (specimen != null) {
        //        item.Specimen = $scope.LabResultSpecimen;
        //    }
        //});
        ////new added end


        var url = "/LIS/Haematology/SaveUrinExamResult";
        if ($scope.LISUrinExamResult.Id > 0) {
            url = "/LIS/Haematology/UpdateUrinExamResult";
        }

        if ($scope.CompanyName == "Prime Hospital Ltd.") {
            //$scope.UrinConsultantt = 1;
        }

        $scope.LISUrinExamResult.TestOrderId = $scope.Patient.Id;
        $scope.LISUrinExamResult.LabId = $scope.LabId;
        $scope.LISUrinExamResult.PthologistId = $scope.UrinConsultantt;
        $scope.LISUrinExamResult.PathologistId2 = $scope.UrinPathologistSearchtwo;
        $scope.LISUrinExamResult.PathologistId3 = $scope.UrinPathologistSearchthree;
        $scope.LISUrinExamResult.Specimen = $scope.UrineSpecimen; // for specimen
        $scope.LISUrinExamResult.LISUrinExamResultDetails = $scope.LISUrinExamResultDetails;

        $scope.LISUrinExamResult.SpecimenNote = $scope.UrineSpecimenNote; 
        if ($scope.SelectedUrineAnalyzerId > 0 && $scope.UrineAnalyzer != null) {
            $scope.LISUrinExamResult.AnalyzerId = $scope.SelectedUrineAnalyzerId;
        }
        else if ($scope.UrineAnalyzer == null) {
            $scope.LISUrinExamResult.AnalyzerId = null;
        }
        else {
            $scope.LISUrinExamResult.AnalyzerId = $scope.UrineAnalyzerId;
        }

        ///
        if ($scope.SelectedUrineCheckedBySignId > 0 && $scope.UrineCheckedBy != null) {
            $scope.LISUrinExamResult.CheckedBySignId = $scope.SelectedUrineCheckedBySignId;
        }
        else if ($scope.UrineCheckedBy == null) {
            $scope.LISUrinExamResult.CheckedBySignId = null;
        }

        ///
        if ($scope.SelectedUrineMedicalTechologistSignId > 0 && $scope.UrineMedicalTechologistBy != null) {
            $scope.LISUrinExamResult.MedicalTechologistSignId = $scope.SelectedUrineMedicalTechologistSignId;
        }
        else if ($scope.UrineMedicalTechologistBy == null) {
            $scope.LISUrinExamResult.MedicalTechologistSignId = null;
        }

        $scope.saveButtonDisable = true;
        $http({
            method: "POST",
            url: url,
            data: { LISUrinExamResult: $scope.LISUrinExamResult, Speciment: $scope.UrinSpecimentName }
        }).success(function (response) {

            $scope.IsClickedUrine = 2;
            if ($scope.LISUrinExamResult.Id != 0) {
                $scope.LISUrinExamResult.Id = response.Id;
            }

            if (response.Success == true) {
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
            }
            $scope.saveButtonDisable = false;

            $scope.GetUrinExamResultByTestOrderId();

        }).error(function (response) {
            $scope.alerts.push({
                'type': 'danger',
                'msg': 'Data Saving Failure!.'
            });
            $scope.saveButtonDisable = false;
        });
    };


    $scope.UpdatePrintStatusHeamatology = function (x) {
        var url = "/LIS/Haematology/UpdatePrintStatusHeamatology";
        $http({
            method: "POST",
            url: url,
            data: { TestOrderId: x }
        }).success(function (response) {


            $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });


        }).error(function (response) {
            $scope.alerts.push({
                'type': 'danger',
                'msg': 'Data Saving Failure!.'
            });
        });
    }

    $scope.UpdatePrintStatusBIOCHEMICAL = function (x) {
        var url = "/LIS/Haematology/UpdatePrintStatusBIOCHEMICAL";
        $http({
            method: "POST",
            url: url,
            data: { TestOrderId: x }
        }).success(function (response) {

            $scope.IsClickedBioChemical = 2;
            $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
        }).error(function (response) {
            $scope.alerts.push({
                'type': 'danger',
                'msg': 'Data Saving Failure!.'
            });
        });
    }

    $scope.UpdatePrintStatusSEROLOGY = function (x) {
        var url = "/LIS/Haematology/UpdatePrintStatusSEROLOGY";
        $http({
            method: "POST",
            url: url,
            data: { TestOrderId: x }
        }).success(function (response) {

            $scope.IsClickedSerology = 3;
            $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });


        }).error(function (response) {
            $scope.alerts.push({
                'type': 'danger',
                'msg': 'Data Saving Failure!.'
            });
        });
    }

    $scope.UpdatePrintStatusImmunology = function (x) {
        var url = "/LIS/Haematology/UpdatePrintStatusImmunology";
        $http({
            method: "POST",
            url: url,
            data: { TestOrderId: x }
        }).success(function (response) {

            $scope.IsClickedHormone = 3;
            $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });


        }).error(function (response) {
            $scope.alerts.push({
                'type': 'danger',
                'msg': 'Data Saving Failure!.'
            });
        });
    }

    $scope.UpdatePrintStatusURINE = function (x) {
        var url = "/LIS/Haematology/UpdatePrintStatusURINE";
        $http({
            method: "POST",
            url: url,
            data: { TestOrderId: x }
        }).success(function (response) {


            $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });


        }).error(function (response) {
            $scope.alerts.push({
                'type': 'danger',
                'msg': 'Data Saving Failure!.'
            });
        });
    }

    $scope.UpdatePrintStatusSTOOL = function (x) {
        var url = "/LIS/Haematology/UpdatePrintStatusSTOOL";
        $http({
            method: "POST",
            url: url,
            data: { TestOrderId: x }
        }).success(function (response) {


            $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });


        }).error(function (response) {
            $scope.alerts.push({
                'type': 'danger',
                'msg': 'Data Saving Failure!.'
            });
        });
    }

    $scope.UpdatePrintStatusLAB = function (x) {
        var url = "/LIS/Haematology/UpdatePrintStatusLAB";
        $http({
            method: "POST",
            url: url,
            data: { TestOrderId: x }
        }).success(function (response) {


            $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });


        }).error(function (response) {
            $scope.alerts.push({
                'type': 'danger',
                'msg': 'Data Saving Failure!.'
            });
        });
    }

    $scope.UpdatePrintStatusMICROBIO = function (x) {
        var url = "/LIS/Haematology/UpdatePrintStatusMICROBIO";
        $http({
            method: "POST",
            url: url,
            data: { TestOrderId: x }
        }).success(function (response) {


            $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });


        }).error(function (response) {
            $scope.alerts.push({
                'type': 'danger',
                'msg': 'Data Saving Failure!.'
            });
        });
    }
    // Lis Stool exam result save here
    $scope.SaveStoolExamResult = function myFunction() {

        $scope.LISStoolExamResultDetails = [];

        var x = document.getElementById("frmStool");

        for (var i = 0; i < x.length; i++) {

            var intputStoolFieldName = x[i].name;
            var particularResult = x.elements[i].value || null;
            if (intputStoolFieldName == null || intputStoolFieldName == "" || particularResult == "" || particularResult == null) {
                continue;
            }

            var stoolIndex = $scope.stoolExamParticulars.findIndex(x => x.ParticularIdentityNo === intputStoolFieldName);
            if (stoolIndex != -1) {
                var particularsStool = $scope.stoolExamParticulars[stoolIndex].Particulars || null;
                var OtherParticulars = "";
                if (stoolIndex == 4) {
                    particularsStool = "SPE-Other01";
                    OtherParticulars = $scope.particulars4;
                }
                else if (stoolIndex == 5) {
                    OtherParticulars = $scope.particulars5;
                    particularsStool = "SPE-Other02";
                }
                else if (stoolIndex == 9) {
                    particularsStool = "SCE-Other01";
                    OtherParticulars = $scope.particulars9;
                }
                else if (stoolIndex == 10) {
                    particularsStool = "SCE-Other02";
                    OtherParticulars = $scope.particulars10;
                }
                else if (stoolIndex == 11) {
                    particularsStool = "SCE-Other03";
                    OtherParticulars = $scope.particulars28;
                }
                else if (stoolIndex == 29) {
                    particularsStool = "SME-Other01";
                    OtherParticulars = $scope.particulars290;
                }
                else if (stoolIndex == 30) {
                    particularsStool = "SME-Other02";
                    OtherParticulars = $scope.particulars300;
                }
                var stoolHeadingId = $scope.stoolExamParticulars[stoolIndex].StoolHeadingId || 0;
                var particularResultStool = x.elements[i].value || null;
            }

            if (particularsStool != null && particularResultStool != null) {
                $scope.LISStoolExamResultDetails.push({
                    'UrinHeading': stoolHeadingId,
                    'Particulars': particularsStool,
                    'OtherParticulars': OtherParticulars,
                    'Result': particularResultStool
                });
                particularsStool = null;
                particularResultStool = null;
            }
        }

        var url = "/LIS/Haematology/SaveStoolExamResult";
        if ($scope.LISStoolExamResult.Id > 0) {
            url = "/LIS/Haematology/UpdateStoolExamResult";
        }
         
        if ($scope.CompanyName == "Prime Hospital Ltd.") {
            //$scope.StoolConsultantt = 1;
        }
        debugger;
        $scope.LISStoolExamResult.TestOrderId = $scope.Patient.Id;
        $scope.LISStoolExamResult.Specimen = $scope.LisStoolSpecimen; // for specimen
        $scope.LISStoolExamResult.PthologistId = $scope.StoolPathologistSearch;
        $scope.LISStoolExamResult.PathologistId2 = $scope.StoolPathologistSearchtwo;
        $scope.LISStoolExamResult.PathologistId3 = $scope.StoolPathologistSearchthree;
        //$scope.LISStoolExamResult.Sample = $scope.StoolSpeciment;
        $scope.LISStoolExamResult.LabId = $scope.LabId;
        //$scope.LISStoolExamResult.PthologistId = $scope.StoolPathologistId;
        $scope.LISStoolExamResult.LISStoolExamResultDetails = $scope.LISStoolExamResultDetails;

        $scope.LISStoolExamResult.SpecimenNote = $scope.StoolSpecimenNote;
        if ($scope.SelectedStoolAnalyzerId > 0 && $scope.StoolAnalyzer != null) {
            $scope.LISStoolExamResult.AnalyzerId = $scope.SelectedStoolAnalyzerId;
        }
        else if ($scope.StoolAnalyzer == null) {
            $scope.LISStoolExamResult.AnalyzerId = null;
        }
        else {
            $scope.LISStoolExamResult.AnalyzerId = $scope.StoolAnalyzerId;
        }

        ///
        if ($scope.SelectedStoolCheckedBySignId > 0 && $scope.StoolCheckedBy != null) {
            $scope.LISStoolExamResult.CheckedBySignId = $scope.SelectedStoolCheckedBySignId;
        }
        else if ($scope.StoolCheckedBy == null) {
            $scope.LISStoolExamResult.CheckedBySignId = null;
        }

        ///
        if ($scope.SelectedStoolMedicalTechologistSignId > 0 && $scope.StoolMedicalTechologistBy != null) {
            $scope.LISStoolExamResult.MedicalTechologistSignId = $scope.SelectedStoolMedicalTechologistSignId;
        }
        else if ($scope.StoolMedicalTechologistBy == null) {
            $scope.LISStoolExamResult.MedicalTechologistSignId = null;
        }


        $scope.saveButtonDisable = true;
        $http({
            method: "POST",
            url: url,
            data: { LISStoolExamResult: $scope.LISStoolExamResult, Speciman: $scope.StoolSpecimentName }
        }).success(function (response) {
            $scope.IsClickedStool = 2;
            if ($scope.LISStoolExamResult.Id != 0) {
                $scope.LISStoolExamResult.Id = response.Id;
            }

            if (response.Success == true) {
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
            }
            $scope.saveButtonDisable = false;

            $scope.GetStoolExamResultByTestOrderId()

        }).error(function (response) {
            $scope.alerts.push({
                'type': 'danger',
                'msg': 'Data Saving Failure!.'
            });
            $scope.saveButtonDisable = false;
        });
    };

    // Lis Lab Exam Result save here.
    $scope.SaveLabReportResult = function () {

        if ($scope.LabExamResults.length != 0) {

            var url = "/LIS/Haematology/SaveLabReportResult";
            if ($scope.LabExamResult.PrimaryId > 0) {
                url = "/LIS/Haematology/UpdateLabReportResult";
            }

            //For Adding Specimen.
            angular.forEach($scope.LabExamResults, function (item) {
                var specimen = $scope.LabResultSpecimen || null;
                if (specimen != null) {
                    item.Specimen = $scope.LabResultSpecimen;
                }   

                item.SpecimenNote = $scope.LabSpecimenNote;
                if ($scope.SelectedLabAnalyzerId > 0 && $scope.LabAnalyzer != null) { 
                    item.AnalyzerId = $scope.SelectedLabAnalyzerId;
                }
                else if ($scope.LabAnalyzer == null) {
                    item.AnalyzerId = null;
                }
                else {
                    item.AnalyzerId = $scope.LabAnalyzerId;
                }

                ///
                if ($scope.SelectedLabCheckedBySignId > 0 && $scope.LabCheckedBy != null) {
                    item.CheckedBySignId = $scope.SelectedLabCheckedBySignId;
                }
                else if ($scope.LabCheckedBy == null) {
                    item.CheckedBySignId = null;
                }

                ///
                if ($scope.SelectedLabMedicalTechologistSignId > 0 && $scope.LabMedicalTechologistBy != null) {
                    item.MedicalTechologistSignId = $scope.SelectedLabMedicalTechologistSignId;
                }
                else if ($scope.LabMedicalTechologistBy == null) {
                    item.MedicalTechologistSignId = null;
                }


                /// Top Heading
                var topHeadValue = $scope.topHeadValue || null;
                if (topHeadValue != null) {
                    item.ReportTopHeading = topHeadValue;
                }
            });

            //For Adding Pathologist Id.
            angular.forEach($scope.LabExamResults, function (item) {
                debugger;
                var consultant = $scope.LabConsultantt || null;
                if (consultant != null) {
                    item.PathologistId = $scope.LabConsultantt;
                }
                if ($scope.LabPathologistSearchtwo != undefined) {
                    consultant = $scope.LabPathologistSearchtwo || null;
                    if (consultant != null) {
                        item.PathologistId2 = $scope.LabPathologistSearchtwo;
                    }
                }
                if ($scope.LabPathologistSearchthree != undefined) {
                    consultant = $scope.LabPathologistSearchthree || null;
                    if (consultant != null) {
                        item.PathologistId3 = $scope.LabPathologistSearchthree;
                    }
                }
                if (consultant == null) {
                    item.PathologistId = 0;
                    $scope.LabPathologist = {
                        ConsultantName: '',
                        Id: 0,
                    };
                }
            });
            $scope.saveButtonDisable = true;
            $http({
                method: "POST",
                url: url,
                data: { labReportResults: $scope.LabExamResults, pathologiestId: $scope.LabPathologist.Id, testOrderId: $scope.TestOrdId, Specimen: $scope.LabSpecimenName, remarks: $scope.LisPatient.LabRemarks }
            }).success(function (response) {
                if (response.Success) {
                    $scope.IsClickedLabReport = 2;
                    if (response.PrimaryId != 0) {
                        $scope.LabExamResult.PrimaryId = 1;
                    }
                    else {
                        $scope.LabExamResult.PrimaryId = 0;
                    }
                    $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
                    $scope.GetLabResultById();

                }
                else {
                    $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
                }
                $scope.saveButtonDisable = false;

            }).error(function myError(response) {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
                $scope.saveButtonDisable = false;
            });
        }
        else {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.detailItem });
        }
    };

    $scope.testOrderChng = function () {
        $scope.printButtonDisable = true;
        $scope.saveButtonDisable = true;
        $scope.NullTabIfTestOrderEmpty();
        //$scope.OnSelectTestOrderId();        
    }

    $scope.$watch("TestOrderIdLoadDate", function (newValue, oldValue) {
        debugger;
        var exactDate = newValue || null
        if (exactDate != null) {
            var dat = $filter('date')(exactDate, "dd-MM-yyyy")
            $http({
                method: "POST",
                url: "/LIS/Haematology/GetAllTestOrders?dat=" + dat
            }).success(function (response) {

                $scope.TestOrders = response;
                $scope.TestOrdId = null;
                //$scope.NullTabIfTestOrderEmpty(); //02062018 it's getting off for default value assigning. 
                $scope.EmptyTabValue();
            }).error(function (response) {

            });
        }
    });


    $scope.changeTestOrderId = function () {
        var orderBy = $filter('orderBy');
        $scope.TestOrders = orderBy($scope.TestOrders,'Id', false);
    }

    $scope.NullTabIfTestOrderEmpty = function () {
        $scope.PrintedBy_Haematology = '';
        $scope.PrintedTime_Haematology = '';
        $scope.PrintedBy_BioChemical = '';
        $scope.PrintedTime_BioChemical = '';
        $scope.PrintedBy_Serology = '';
        $scope.PrintedTime_Serology = '';

        $scope.PrintedBy_Immunology = '';
        $scope.PrintedTime_Immunology = '';

        $scope.PrintedBy_Urine = '';
        $scope.PrintedTime_Urine = '';

        $scope.PrintedBy_Stool = '';
        $scope.PrintedTime_Stool = '';

        $scope.PrintedBy_Lab = '';
        $scope.PrintedTime_Lab = '';

        $scope.PrintedBy_Microbiology = '';
        $scope.PrintedTime_Microbiology = '';

        $scope.printButtonDisable = true;
        $scope.saveButtonDisable = true;
        $scope.Patient = {};

        $scope.LabExamResults = [];
        $scope.LabExamResult = {};

        $scope.LISUrinExamResult = {};
        $scope.Specimen = null;
        $scope.BioChemicalPathologist = null;
        $scope.LISUrinExamResultDetails = [];
        angular.forEach($scope.examParticulars, function (item) {
            document.getElementsByName(item.ParticularIdentityNo)[0].value = null;
        });

        $scope.LISStoolExamResult = {};
        $scope.StoolSpeciment = null;
        $scope.StoolPathologistId = null;
        $scope.LISStoolExamResultDetails = [];
        angular.forEach($scope.stoolExamParticulars, function (item) {
            document.getElementsByName(item.ParticularIdentityNo)[0].value = null;
        });

        //$scope.SetUrineDropdownValue();
        //$scope.setStoolDropdownValue();
    }

    $scope.GetUrinExamResultByTestOrderId = function () { 
        $scope.setUrineDefaultValue();
       
    };

    $scope.SetUrineDefaults = function () {
        //common
        $scope.Color = "Straw";
        $scope.Appearance = "Clear";
        $scope.Sediment = "Nil";
        $scope.Reaction = "Acidic";
        document.getElementsByName("U12")[0].value = $scope.Color;
        document.getElementsByName("U13")[0].value = $scope.Appearance;
        document.getElementsByName("U14")[0].value = $scope.Sediment;
        document.getElementsByName("U23")[0].value = $scope.Reaction;

        //baraka
        //$scope.Quantity = '20ml';
        //$scope.Albumin = 'Nil';
        //$scope.Sugar = 'Nil';
        //$scope.PusCells = '0 - 2 /HPF';
        //$scope.Epithelialcells = '0 - 2 /HPF';
        //document.getElementsByName("U11")[0].value = $scope.Quantity;
        //document.getElementsByName("U22")[0].value = $scope.Albumin;
        //document.getElementsByName("U21")[0].value = $scope.Sugar;
        //document.getElementsByName("U31")[0].value = $scope.PusCells;
        //document.getElementsByName("U33")[0].value = $scope.Epithelialcells;

        //insaf
        $scope.Rbc = 'Nil';
        $scope.CellularCast = '';
        $scope.WBCCast = '';
        $scope.Urates = '';
        document.getElementsByName("U32")[0].value = $scope.Rbc;
        document.getElementsByName("U312")[0].value = $scope.CellularCast;
        document.getElementsByName("U319")[0].value = $scope.WBCCast;
        document.getElementsByName("U320")[0].value = $scope.Urates;

        $scope.YeastCells = 'Nil';
        $scope.GranularCast = 'Nil';
        $scope.CalciumOxalate = 'Nil';
        $scope.TriplePhosphate = 'Nil';
        document.getElementsByName("U321")[0].value = $scope.YeastCells;
        document.getElementsByName("U314")[0].value = $scope.GranularCast;
        document.getElementsByName("U34")[0].value = $scope.CalciumOxalate;
        document.getElementsByName("U36")[0].value = $scope.TriplePhosphate;

        $scope.UricAcid = 'Nil';
        $scope.AmorphPhosphate = 'Nil';
        $scope.Spermatozoa = 'Nil';
        $scope.PusCellCast = '';
        $scope.CalciumCarbonate = '';
        document.getElementsByName("U35")[0].value = $scope.UricAcid;
        document.getElementsByName("U37")[0].value = $scope.AmorphPhosphate;
        document.getElementsByName("U39")[0].value = $scope.Spermatozoa;
        document.getElementsByName("U322")[0].value = $scope.PusCellCast;
        document.getElementsByName("U323")[0].value = $scope.CalciumCarbonate;
    }

    $scope.SetUrineDefaultsTMSS = function () {
        //common
        $scope.Color = "Straw";
        $scope.Appearance = "Clear";
        $scope.Sediment = "Nil";
        //$scope.Reaction = "Acidic";
        document.getElementsByName("U12")[0].value = $scope.Color;
        document.getElementsByName("U13")[0].value = $scope.Appearance;
        document.getElementsByName("U14")[0].value = $scope.Sediment;
        //document.getElementsByName("U23")[0].value = $scope.Reaction;

        //$scope.Quantity = '20ml';
        $scope.Albumin = 'Nil';
        $scope.Sugar = 'Nil';
        $scope.PusCells = 'Nil';
        //$scope.Epithelialcells = '0 - 2 /HPF';
        //document.getElementsByName("U11")[0].value = $scope.Quantity;
        document.getElementsByName("U22")[0].value = $scope.Albumin;
        document.getElementsByName("U21")[0].value = $scope.Sugar;
        document.getElementsByName("U31")[0].value = $scope.PusCells;
        //document.getElementsByName("U33")[0].value = $scope.Epithelialcells;

        $scope.Rbc = 'Nil';
        $scope.WBCCast = 'Nil';
        document.getElementsByName("U32")[0].value = $scope.Rbc;
        document.getElementsByName("U319")[0].value = $scope.WBCCast;

        $scope.YeastCells = 'NF';
        $scope.GranularCast = 'NF';
        $scope.CalciumOxalate = 'NF';
        $scope.TriplePhosphate = 'Nil';
        document.getElementsByName("U321")[0].value = $scope.YeastCells;
        document.getElementsByName("U314")[0].value = $scope.GranularCast;
        document.getElementsByName("U34")[0].value = $scope.CalciumOxalate;
        document.getElementsByName("U36")[0].value = $scope.TriplePhosphate;

        $scope.UricAcid = 'Nil';
        $scope.AmorphPhosphate = 'Nil';
        $scope.Spermatozoa = 'Nil';
        document.getElementsByName("U35")[0].value = $scope.UricAcid;
        document.getElementsByName("U37")[0].value = $scope.AmorphPhosphate;
        document.getElementsByName("U39")[0].value = $scope.Spermatozoa;
    }

    $scope.SetUrineDefaultsInsaf = function () {
        //common
        $scope.Color = "Straw";
        $scope.Appearance = "Clear";
        $scope.Sediment = "Nil";
        $scope.Reaction = "Acidic";
        document.getElementsByName("U12")[0].value = $scope.Color;
        document.getElementsByName("U13")[0].value = $scope.Appearance;
        document.getElementsByName("U14")[0].value = $scope.Sediment;
        document.getElementsByName("U23")[0].value = $scope.Reaction;

        //baraka
        //$scope.Quantity = '20ml';
        //$scope.Albumin = 'Nil';
        //$scope.Sugar = 'Nil';
        //$scope.PusCells = '0 - 2 /HPF';
        //$scope.Epithelialcells = '0 - 2 /HPF';
        //document.getElementsByName("U11")[0].value = $scope.Quantity;
        //document.getElementsByName("U22")[0].value = $scope.Albumin;
        //document.getElementsByName("U21")[0].value = $scope.Sugar;
        //document.getElementsByName("U31")[0].value = $scope.PusCells;
        //document.getElementsByName("U33")[0].value = $scope.Epithelialcells;

        //insaf
        $scope.Rbc = 'Nil';
        $scope.CellularCast = 'Nil';
        $scope.WBCCast = 'Nil';
        $scope.Urates = 'Nil';
        document.getElementsByName("U32")[0].value = $scope.Rbc;
        document.getElementsByName("U312")[0].value = $scope.CellularCast;
        document.getElementsByName("U319")[0].value = $scope.WBCCast;
        document.getElementsByName("U320")[0].value = $scope.Urates;

        $scope.YeastCells = 'Nil';
        $scope.GranularCast = 'Nil';
        $scope.CalciumOxalate = 'Nil';
        $scope.TriplePhosphate = 'Nil';
        document.getElementsByName("U321")[0].value = $scope.YeastCells;
        document.getElementsByName("U314")[0].value = $scope.GranularCast;
        document.getElementsByName("U34")[0].value = $scope.CalciumOxalate;
        document.getElementsByName("U36")[0].value = $scope.TriplePhosphate;

        $scope.UricAcid = 'Nil';
        $scope.AmorphPhosphate = 'Nil';
        $scope.Spermatozoa = 'Nil';
        $scope.PusCellCast = 'Nil';
        $scope.CalciumCarbonate = 'Nil';
        document.getElementsByName("U35")[0].value = $scope.UricAcid;
        document.getElementsByName("U37")[0].value = $scope.AmorphPhosphate;
        document.getElementsByName("U39")[0].value = $scope.Spermatozoa;
        document.getElementsByName("U322")[0].value = $scope.PusCellCast;
        document.getElementsByName("U323")[0].value = $scope.CalciumCarbonate;
    }

    $scope.setUrineDefaultValue = function () {
        
        //Urine Physical Examination
        if (($filter('filter')($scope.Quantity_Urine, { IsDefault: true })).length > 0) {
            $scope.Quantity = ($filter('filter')($scope.Quantity_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U11")[0].value = $scope.Quantity;
        }
        else {
            $scope.Quantity = '';
            document.getElementsByName("U11")[0].value = $scope.Quantity;
        }

        if (($filter('filter')($scope.Color_Urine, { IsDefault: true })).length > 0) {
            $scope.Color = ($filter('filter')($scope.Color_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U12")[0].value = $scope.Color;
        }
        else {
            $scope.Color = '';
            document.getElementsByName("U12")[0].value = $scope.Color;
        }
        if (($filter('filter')($scope.Appearance_Urine, { IsDefault: true })).length > 0) {
            $scope.Appearance = ($filter('filter')($scope.Appearance_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U13")[0].value = $scope.Appearance;
        }
        else {
            scope.Appearance = '';
            document.getElementsByName("U13")[0].value = $scope.Appearance;
        }
        if (($filter('filter')($scope.Sediment_Urine, { IsDefault: true })).length > 0) {
            $scope.Sediment = ($filter('filter')($scope.Sediment_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U14")[0].value = $scope.Sediment;
        }
        else {
            $scope.Sediment = '';
            document.getElementsByName("U14")[0].value = $scope.Sediment;
        }
        if (($filter('filter')($scope.PhyExOther01_Urine, { IsDefault: true })).length > 0) {
            $scope.PhyExOther01 = ($filter('filter')($scope.PhyExOther01_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U16")[0].value = $scope.PhyExOther01;
        }
        else {
            $scope.PhyExOther01 = '';
            document.getElementsByName("U16")[0].value = $scope.PhyExOther01;
        }
        if (($filter('filter')($scope.PhyExOther02_Urine, { IsDefault: true })).length > 0) {
            $scope.PhyExOther02 = ($filter('filter')($scope.PhyExOther02_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U17")[0].value = $scope.PhyExOther02;
        }
        else {
            $scope.PhyExOther02 = '';
            document.getElementsByName("U17")[0].value = $scope.PhyExOther02;
        }
        if (($filter('filter')($scope.PhyExOther03_Urine, { IsDefault: true })).length > 0) {
            $scope.PhyExOther03 = ($filter('filter')($scope.PhyExOther03_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U18")[0].value = $scope.PhyExOther03;
        }
        else {
            $scope.PhyExOther03 = '';
            document.getElementsByName("U18")[0].value = $scope.PhyExOther03;
        }
        if (($filter('filter')($scope.SpGravity_Urine, { IsDefault: true })).length > 0) {
            $scope.SpGravity = ($filter('filter')($scope.SpGravity_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U15")[0].value = $scope.SpGravity;
        }
        else {
            $scope.SpGravity = '';
            document.getElementsByName("U15")[0].value = $scope.SpGravity;
        }

        //Urine Chemical Examination
        if (($filter('filter')($scope.Reaction_Urine, { IsDefault: true })).length > 0) {
            $scope.Reaction = ($filter('filter')($scope.Reaction_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U23")[0].value = $scope.Reaction;
        }
        else {
            $scope.Reaction = '';
            document.getElementsByName("U23")[0].value = $scope.Reaction;
        }
        if (($filter('filter')($scope.KetoneBodies_Urine, { IsDefault: true })).length > 0) {
            $scope.KetoneBodies = ($filter('filter')($scope.KetoneBodies_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U25")[0].value = $scope.KetoneBodies;
        }
        else {
            $scope.KetoneBodies = '';
            document.getElementsByName("U25")[0].value = $scope.KetoneBodies;
        }
        if (($filter('filter')($scope.BilePigment_Urine, { IsDefault: true })).length > 0) {
            $scope.BilePigment = ($filter('filter')($scope.BilePigment_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U28")[0].value = $scope.BilePigment;
        }
        else {
            $scope.BilePigment = '';
            document.getElementsByName("U28")[0].value = $scope.BilePigment;
        }
        if (($filter('filter')($scope.Albumin_Urine, { IsDefault: true })).length > 0) {
            $scope.Albumin = ($filter('filter')($scope.Albumin_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U22")[0].value = $scope.Albumin;
        }
        else {
            $scope.Albumin = '';
            document.getElementsByName("U22")[0].value = $scope.Albumin;
        }
        if (($filter('filter')($scope.BenjonesProtein_Urine, { IsDefault: true })).length > 0) {
            $scope.BenjonesProtein = ($filter('filter')($scope.BenjonesProtein_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U29")[0].value = $scope.BenjonesProtein;
        }
        else {
            $scope.BenjonesProtein = '';
            document.getElementsByName("U29")[0].value = $scope.BenjonesProtein;
        }
        if (($filter('filter')($scope.Ph_Urine, { IsDefault: true })).length > 0) {
            $scope.Ph = ($filter('filter')($scope.Ph_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U212")[0].value = $scope.Ph;
        }
        else {
            $scope.Ph = '';
            document.getElementsByName("U212")[0].value = $scope.Ph;
        }
        if (($filter('filter')($scope.Sugar_Urine, { IsDefault: true })).length > 0) {
            $scope.Sugar = ($filter('filter')($scope.Sugar_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U21")[0].value = $scope.Sugar;
        }
        else {
            $scope.Sugar = '';
            document.getElementsByName("U21")[0].value = $scope.Sugar;
        }
        if (($filter('filter')($scope.Urobilinogen_Urine, { IsDefault: true })).length > 0) {
            $scope.Urobilinogen = ($filter('filter')($scope.Urobilinogen_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U26")[0].value = $scope.Urobilinogen;
        }
        else {
            $scope.Urobilinogen = '';
            document.getElementsByName("U26")[0].value = $scope.Urobilinogen;
        }
        if (($filter('filter')($scope.CheExOther01_Urine, { IsDefault: true })).length > 0) {
            $scope.CheExOther01 = ($filter('filter')($scope.CheExOther01_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U210")[0].value = $scope.CheExOther01;
        }
        else {
            $scope.CheExOther01 = '';
            document.getElementsByName("U210")[0].value = $scope.CheExOther01;
        }
        if (($filter('filter')($scope.ExPhosphate_Urine, { IsDefault: true })).length > 0) {
            $scope.ExPhosphate = ($filter('filter')($scope.ExPhosphate_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U24")[0].value = $scope.ExPhosphate;
        }
        else {
            $scope.ExPhosphate = '';
            document.getElementsByName("U24")[0].value = $scope.ExPhosphate;
        }
        if (($filter('filter')($scope.BileSalt_Urine, { IsDefault: true })).length > 0) {
            $scope.BileSalt = ($filter('filter')($scope.BileSalt_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U27")[0].value = $scope.BileSalt;
        }
        else {
            $scope.BileSalt = '';
            document.getElementsByName("U27")[0].value = $scope.BileSalt;
        }
        if (($filter('filter')($scope.CheExOther02_Urine, { IsDefault: true })).length > 0) {
            $scope.CheExOther02 = ($filter('filter')($scope.CheExOther02_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U211")[0].value = $scope.CheExOther02;
        }
        else {
            $scope.CheExOther02 = '';
            document.getElementsByName("U211")[0].value = $scope.CheExOther02;
        }
        if (($filter('filter')($scope.Nitrite_Urine, { IsDefault: true })).length > 0) {
            $scope.Nitrite = ($filter('filter')($scope.Nitrite_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U213")[0].value = $scope.Nitrite;
        }
        else {
            $scope.Nitrite = '';
            document.getElementsByName("U213")[0].value = $scope.Nitrite;
        }
        if (($filter('filter')($scope.Bilirubin_Urine, { IsDefault: true })).length > 0) {
            $scope.Bilirubin = ($filter('filter')($scope.Bilirubin_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U214")[0].value = $scope.Bilirubin;
        }
        else {
            $scope.Bilirubin = '';
            document.getElementsByName("U214")[0].value = $scope.Bilirubin;
        }
        if (($filter('filter')($scope.Microalbomin_Urine, { IsDefault: true })).length > 0) {
            $scope.Microalbomin = ($filter('filter')($scope.Microalbomin_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U215")[0].value = $scope.Microalbomin;
        }
        else {
            $scope.Microalbomin = '';
            document.getElementsByName("U215")[0].value = $scope.Microalbomin;
        }
        if (($filter('filter')($scope.Ascorbic_Urine, { IsDefault: true })).length > 0) {
            $scope.Ascorbic = ($filter('filter')($scope.Ascorbic_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U216")[0].value = $scope.Ascorbic;
        }
        else {
            $scope.Ascorbic = '';
            document.getElementsByName("U216")[0].value = $scope.Ascorbic;
        }
        if (($filter('filter')($scope.Creatinine_Urine, { IsDefault: true })).length > 0) {
            $scope.Creatinine = ($filter('filter')($scope.Creatinine_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U217")[0].value = $scope.Creatinine;
        }
        else {
            $scope.Creatinine = '';
            document.getElementsByName("U217")[0].value = $scope.Creatinine;
        }
        if (($filter('filter')($scope.SpecificGravity_Urine, { IsDefault: true })).length > 0) {
            $scope.SpecificGravity = ($filter('filter')($scope.SpecificGravity_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U218")[0].value = $scope.SpecificGravity;
        }
        else {
            $scope.SpecificGravity = '';
            document.getElementsByName("U218")[0].value = $scope.SpecificGravity;
        }

        //Uring Microscopic Examination
        if (($filter('filter')($scope.PusCells_Urine, { IsDefault: true })).length > 0) {
            $scope.PusCells = ($filter('filter')($scope.PusCells_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U31")[0].value = $scope.PusCells;
        }
        else {
            $scope.PusCells = '';
            document.getElementsByName("U31")[0].value = $scope.PusCells;
        }


        if (($filter('filter')($scope.AmorphPhosphate_Urine, { IsDefault: true })).length > 0) {
            $scope.AmorphPhosphate = ($filter('filter')($scope.AmorphPhosphate_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U37")[0].value = $scope.AmorphPhosphate;
        }
        else {
            $scope.AmorphPhosphate = '';
            document.getElementsByName("U37")[0].value = $scope.AmorphPhosphate;
        }
        if (($filter('filter')($scope.GranularCast_Urine, { IsDefault: true })).length > 0) {
            $scope.GranularCast = ($filter('filter')($scope.GranularCast_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U314")[0].value = $scope.GranularCast;
        }
        else {
            $scope.GranularCast = '';
            document.getElementsByName("U314")[0].value = $scope.GranularCast;
        }
        if (($filter('filter')($scope.Epithelialcells_Urine, { IsDefault: true })).length > 0) {
            $scope.Epithelialcells = ($filter('filter')($scope.Epithelialcells_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U33")[0].value = $scope.Epithelialcells;
        }
        else {
            $scope.Epithelialcells = '';
            document.getElementsByName("U33")[0].value = $scope.Epithelialcells;
        }
        if (($filter('filter')($scope.Mucus_Urine, { IsDefault: true })).length > 0) {
            $scope.Mucus = ($filter('filter')($scope.Mucus_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U38")[0].value = $scope.Mucus;
        }
        else {
            $scope.Mucus = '';
            document.getElementsByName("U38")[0].value = $scope.Mucus;
        }
        if (($filter('filter')($scope.HyalineCast_Urine, { IsDefault: true })).length > 0) {
            $scope.HyalineCast = ($filter('filter')($scope.HyalineCast_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U313")[0].value = $scope.HyalineCast;
        }
        else {
            $scope.HyalineCast = '';
            document.getElementsByName("U313")[0].value = $scope.HyalineCast;
        }
        if (($filter('filter')($scope.Rbc_Urine, { IsDefault: true })).length > 0) {
            $scope.Rbc = ($filter('filter')($scope.Rbc_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U32")[0].value = $scope.Rbc;
        }
        else {
            $scope.Rbc = '';
            document.getElementsByName("U32")[0].value = $scope.Rbc;
        }

        if (($filter('filter')($scope.Spermatozoa_Urine, { IsDefault: true })).length > 0) {
            $scope.Spermatozoa = ($filter('filter')($scope.Spermatozoa_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U39")[0].value = $scope.Spermatozoa;
        }
        else {
            $scope.Spermatozoa = '';
            document.getElementsByName("U39")[0].value = $scope.Spermatozoa;
        }
        if (($filter('filter')($scope.MicExOther01_Urine, { IsDefault: true })).length > 0) {
            $scope.MicExOther01 = ($filter('filter')($scope.MicExOther01_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U315")[0].value = $scope.MicExOther01;
        }
        else {
            $scope.MicExOther01 = '';
            document.getElementsByName("U315")[0].value = $scope.MicExOther01;
        }
        if (($filter('filter')($scope.CalciumOxalate_Urine, { IsDefault: true })).length > 0) {
            $scope.CalciumOxalate = ($filter('filter')($scope.CalciumOxalate_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U34")[0].value = $scope.CalciumOxalate;
        }
        else {
            $scope.CalciumOxalate = '';
            document.getElementsByName("U34")[0].value = $scope.CalciumOxalate;
        }
        if (($filter('filter')($scope.TricomonasVaginails_Urine, { IsDefault: true })).length > 0) {
            $scope.TricomonasVaginails = ($filter('filter')($scope.TricomonasVaginails_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U310")[0].value = $scope.TricomonasVaginails;
        }
        else {
            $scope.TricomonasVaginails = '';
            document.getElementsByName("U310")[0].value = $scope.TricomonasVaginails;
        }
        if (($filter('filter')($scope.MicExOther02_Urine, { IsDefault: true })).length > 0) {
            $scope.MicExOther02 = ($filter('filter')($scope.MicExOther02_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U316")[0].value = $scope.MicExOther02;
        }
        else {
            $scope.MicExOther02 = '';
            document.getElementsByName("U316")[0].value = $scope.MicExOther02;
        }
        if (($filter('filter')($scope.UricAcid_Urine, { IsDefault: true })).length > 0) {
            $scope.UricAcid = ($filter('filter')($scope.UricAcid_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U35")[0].value = $scope.UricAcid;
        }
        else {
            $scope.UricAcid = '';
            document.getElementsByName("U35")[0].value = $scope.UricAcid;
        }
        if (($filter('filter')($scope.MicroOrganism_Urine, { IsDefault: true })).length > 0) {
            $scope.MicroOrganism = ($filter('filter')($scope.MicroOrganism_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U311")[0].value = $scope.MicroOrganism;
        }
        else {
            $scope.MicroOrganism = '';
            document.getElementsByName("U311")[0].value = $scope.MicroOrganism;
        }
        if (($filter('filter')($scope.MicExOther03_Urine, { IsDefault: true })).length > 0) {
            $scope.MicExOther03 = ($filter('filter')($scope.MicExOther03_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U317")[0].value = $scope.MicExOther03;
        }
        else {
            $scope.MicExOther03 = '';
            document.getElementsByName("U317")[0].value = $scope.MicExOther03;
        }
        if (($filter('filter')($scope.TriplePhosphate_Urine, { IsDefault: true })).length > 0) {
            $scope.TriplePhosphate = ($filter('filter')($scope.TriplePhosphate_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U36")[0].value = $scope.TriplePhosphate;
        }
        else {
            $scope.TriplePhosphate = '';
            document.getElementsByName("U36")[0].value = $scope.TriplePhosphate;
        }
        if (($filter('filter')($scope.CellularCast_Urine, { IsDefault: true })).length > 0) {
            $scope.CellularCast = ($filter('filter')($scope.CellularCast_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U312")[0].value = $scope.CellularCast;
        }
        else {
            $scope.CellularCast = '';
            document.getElementsByName("U312")[0].value = $scope.CellularCast;
        }
        if (($filter('filter')($scope.MicExOther04_Urine, { IsDefault: true })).length > 0) {
            $scope.MicExOther04 = ($filter('filter')($scope.MicExOther04_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U318")[0].value = $scope.MicExOther04;
        }
        else {
            $scope.MicExOther04 = '';
            document.getElementsByName("U318")[0].value = $scope.MicExOther04;
        }
        if (($filter('filter')($scope.WBCCast_Urine, { IsDefault: true })).length > 0) {
            $scope.WBCCast = ($filter('filter')($scope.WBCCast_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U319")[0].value = $scope.WBCCast;
        }
        else {
            $scope.WBCCast = '';
            document.getElementsByName("U319")[0].value = $scope.WBCCast;
        }
        if (($filter('filter')($scope.Urates_Urine, { IsDefault: true })).length > 0) {
            $scope.Urates = ($filter('filter')($scope.Urates_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U320")[0].value = $scope.Urates;
        }
        else {
            $scope.Urates = '';
            document.getElementsByName("U320")[0].value = $scope.Urates;
        }
        if (($filter('filter')($scope.YeastCells_Urine, { IsDefault: true })).length > 0) {
            $scope.YeastCells = ($filter('filter')($scope.YeastCells_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U321")[0].value = $scope.YeastCells;
        }
        else {
            $scope.YeastCells = '';
            document.getElementsByName("U321")[0].value = $scope.YeastCells;
        }
        if (($filter('filter')($scope.PusCellCast_Urine, { IsDefault: true })).length > 0) {
            $scope.PusCellCast = ($filter('filter')($scope.PusCellCast_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U322")[0].value = $scope.PusCellCast;
        }
        else {
            $scope.PusCellCast = '';
            document.getElementsByName("U322")[0].value = $scope.PusCellCast;
        }
        if (($filter('filter')($scope.CalciumCarbonate_Urine, { IsDefault: true })).length > 0) {
            $scope.CalciumCarbonate = ($filter('filter')($scope.CalciumCarbonate_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U323")[0].value = $scope.CalciumCarbonate;
        }
        else {
            $scope.CalciumCarbonate = '';
            document.getElementsByName("U323")[0].value = $scope.CalciumCarbonate;
        }
        if (($filter('filter')($scope.Candida_Urine, { IsDefault: true })).length > 0) {
            $scope.UrineCandida = ($filter('filter')($scope.Candida_Urine, { IsDefault: true }))[0].Value;
            document.getElementsByName("U324")[0].value = $scope.UrineCandida;
        }
        else {
            $scope.UrineCandida = '';
            document.getElementsByName("U324")[0].value = $scope.UrineCandida;
        }

        $http({
            method: "GET",
            url: "/LIS/Haematology/GetUrinExamResultByTestOrderId?testOrderId=" + ($scope.TestOrdId)
        }).success(function (response) {
            debugger;
            var specimenId = 2;
            if (response.Success) {

                if (response.urinExmResMaster.Specimen) {
                    specimenId = response.urinExmResMaster.Specimen;
                }

                if (response.urinExmResMaster.AnalyzerId > 0) {
                    $scope.UrineAnalyzerId = response.urinExmResMaster.AnalyzerId;
                    $scope.UrineAnalyzer = $scope.UrineAnalyzers.filter(x => x.Id == $scope.UrineAnalyzerId)[0].AnalyzerName;

                }
                else {
                    $scope.UrineAnalyzerId = response.UrineAnalyzerId[0];
                    $scope.UrineAnalyzer = response.UrineAnalyzerName;

                }

                if (response.urinExmResMaster.CheckedBySignId > 0) {
                    $scope.UrineCheckedBySignId = response.urinExmResMaster.CheckedBySignId;
                    $scope.UrineCheckedBy = $scope.CheckedByList.filter(x => x.Id == $scope.UrineCheckedBySignId)[0];

                }
                else {
                    $scope.UrineCheckedBySignId = null;
                }

                if (response.urinExmResMaster.MedicalTechologistSignId > 0) {
                    $scope.UrineMedicalTechologistSignId = response.urinExmResMaster.MedicalTechologistSignId;
                    $scope.UrineMedicalTechologistBy = $scope.MedicalTechologistList.filter(x => x.Id == $scope.UrineMedicalTechologistSignId)[0];

                }
                else {
                    $scope.UrineMedicalTechologistSignId = null;
                }

                $scope.UrineSpecimenNote = response.urinExmResMaster.SpecimenNote;
                $scope.LISUrinExamResult = response.urinExmResMaster;
                $scope.LISUrinExamResultDetails = response.urinExamResultDetails;

                angular.forEach($scope.LISUrinExamResultDetails, function (item) {
                    document.getElementsByName(item.ParticularIdentityNo)[0].value = item.Result;

                    if (item.ParticularIdentityNo == "U11") {
                        $scope.Quantity = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U12") {
                        $scope.Color = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U13") {
                        $scope.Appearance = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U14") {
                        $scope.Sediment = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U16") {
                        $scope.PhyExOther01 = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U17") {
                        $scope.PhyExOther02 = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U18") {
                        $scope.PhyExOther03 = item.Result
                    }
                    else if (item.ParticularIdentityNo == "U15") {
                        $scope.SpGravity = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U23") {
                        $scope.Reaction = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U25") {
                        $scope.KetoneBodies = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U28") {
                        $scope.BilePigment = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U22") {
                        $scope.Albumin = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U29") {
                        $scope.BenjonesProtein = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U212") {
                        $scope.Ph = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U21") {
                        $scope.Sugar = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U26") {
                        $scope.Urobilinogen = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U210") {
                        $scope.CheExOther01 = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U24") {
                        $scope.ExPhosphate = item.Result
                    }
                    else if (item.ParticularIdentityNo == "U27") {
                        $scope.BileSalt = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U211") {
                        $scope.CheExOther02 = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U213") {
                        $scope.Nitrite = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U214") {
                        $scope.Bilirubin = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U215") {
                        $scope.Microalbomin = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U216") {
                        $scope.Ascorbic = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U217") {
                        $scope.Creatinine = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U218") {
                        $scope.SpecificGravity = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U31") {
                        $scope.PusCells = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U37") {
                        $scope.AmorphPhosphate = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U314") {
                        $scope.GranularCast = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U33") {
                        $scope.Epithelialcells = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U38") {
                        $scope.Mucus = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U313") {
                        $scope.HyalineCast = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U32") {
                        $scope.Rbc = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U39") {
                        $scope.Spermatozoa = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U315") {
                        $scope.MicExOther01 = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U34") {
                        $scope.CalciumOxalate = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U310") {
                        $scope.TricomonasVaginails = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U316") {
                        $scope.MicExOther02 = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U35") {
                        $scope.UricAcid = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U311") {
                        $scope.MicroOrganism = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U317") {
                        $scope.MicExOther03 = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U36") {
                        $scope.TriplePhosphate = item.Result
                    }
                    else if (item.ParticularIdentityNo == "U312") {
                        $scope.CellularCast = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U318") {
                        $scope.MicExOther04 = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U319") {
                        $scope.WBCCast = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U320") {
                        $scope.Urates = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U321") {
                        $scope.YeastCells = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U322") {
                        $scope.PusCellCast = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U323") {
                        $scope.CalciumCarbonate = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "U324") {
                        $scope.UrineCandida = item.Result;
                    }


                    var index = 0;

                    if (item.Particulars == "UPE-Other01") {
                        $scope.particulars28 = item.OtherParticulars;
                    }
                    else if (item.Particulars == "UPE-Other02") {
                        $scope.particulars29 = item.OtherParticulars;
                    }
                    else if (item.Particulars == "UPE-Other03") {
                        $scope.particulars30 = item.OtherParticulars;
                    }
                    else if (item.Particulars == "UCE-Other01") {
                        $scope.particulars31 = item.OtherParticulars;
                    }
                    else if (item.Particulars == "UCE-Other02") {
                        $scope.particulars32 = item.OtherParticulars;
                    }
                    else if (item.Particulars == "UME-Other01") {
                        $scope.particulars33 = item.OtherParticulars;
                    }
                    else if (item.Particulars == "UME-Other02") {
                        $scope.particulars34 = item.OtherParticulars;
                    }
                    else if (item.Particulars == "UME-Other03") {
                        $scope.particulars35 = item.OtherParticulars;
                    }
                    else if (item.Particulars == "Bacteria") {
                        $scope.particulars36 = item.OtherParticulars;
                    }
                });
                $scope.UrinPrintStatus = $scope.LISUrinExamResult.ReportStatus;

                $scope.UrinPathologist = {
                    "ConsultantName": response.pathologist.ConsultantName,
                    "Id": response.pathologist.Id
                };
                debugger;
                if (response.pathologist2.Id > 0) {
                    $scope.UrinPathologistSearchtwo = response.pathologist2.Id;
                    $scope.UrinPathologisttwo = $scope.Consultants.filter(x => x.Id == $scope.UrinPathologistSearchtwo)[0];
                }
                if (response.pathologist3.Id > 0) {
                    $scope.UrinPathologistSearchthree = response.pathologist3.Id;
                    $scope.UrinPathologistthree = $scope.Consultants.filter(x => x.Id == $scope.UrinPathologistSearchthree)[0];
                }


                if ($scope.UrineCheckbox == true) {
                    var lastUrineTechnician = $.cookie("lastUrineTechnician");
                    $scope.UrinPathologist = JSON.parse(lastUrineTechnician);
                }
                $scope.UrinConsultantt = response.pathologist.Id;
                $scope.UrinPathologistSearch = $scope.UrinConsultantt;

                $scope.PrintedBy_Urine = response.urinExmResMaster.printedBy;
                $scope.PrintedTime_Urine = response.urinExmResMaster.printedTime;
            }
            else {
                var lastUrineTechnician = $.cookie("lastUrineTechnician");
                if (lastUrineTechnician != undefined) {
                    $scope.UrinPathologists = JSON.parse(lastUrineTechnician);
                    $scope.UrinConsultantt = $scope.UrinPathologists.Id;
                    $scope.UrinPathologistSearch = $scope.UrinConsultantt;
                }
                
            }

            $scope.UrinarySpeciment = $filter('filter')($scope.Specimens, { Id: specimenId })[0];
            $scope.UrineSpecimen = $scope.UrinarySpeciment.Id;
        }).error(function myError(response) {

        });
    }

    $scope.SetStoolDefaults = function () {
        $scope.StoolMuscleFibers = 'Nil';
        $scope.StoolMacroPhage = 'Nil';
        $scope.StoolFatGlobule = 'Nil';
        $scope.StoolMucus = 'Present (+)';
        //$scope.Mucus = 'Nil';
        document.getElementsByName("S312")[0].value = $scope.StoolMuscleFibers;
        document.getElementsByName("S314")[0].value = $scope.StoolMacroPhage;
        document.getElementsByName("S316")[0].value = $scope.StoolFatGlobule;
        document.getElementsByName("S14")[0].value = $scope.StoolMucus;

        $scope.StoolCystGiardialamblia = 'Nil';
        $scope.CystEColi = 'Nil';
        $scope.Ankylostoma = 'Nil';
        $scope.StoolTrichuris = 'Nil';
        document.getElementsByName("S323")[0].value = $scope.StoolCystGiardialamblia;
        document.getElementsByName("S324")[0].value = $scope.CystEColi;
        document.getElementsByName("S325")[0].value = $scope.Ankylostoma;
        document.getElementsByName("S326")[0].value = $scope.StoolTrichuris;

        $scope.StrongStercoralis = 'Nil';
        $scope.EColi = 'Nil';
        $scope.StoolStarchGranules = 'Nil';
        $scope.StoolEhistolytica = 'Nil';

        document.getElementsByName("S327")[0].value = $scope.StrongStercoralis;
        document.getElementsByName("S322")[0].value = $scope.EColi;
        document.getElementsByName("S320")[0].value = $scope.StoolStarchGranules;
        document.getElementsByName("S317")[0].value = $scope.StoolEhistolytica;
    }

    $scope.setStoolDefaultValue = function () {
        //Stool Physical Examination
        if (($filter('filter')($scope.StoolConsistency_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolConsistency = ($filter('filter')($scope.StoolConsistency_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S11")[0].value = $scope.StoolConsistency;
        }
        else {
            $scope.StoolConsistency = '';
            document.getElementsByName("S11")[0].value = $scope.StoolConsistency;
        }
        if (($filter('filter')($scope.StoolBlood_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolBlood = ($filter('filter')($scope.StoolBlood_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S12")[0].value = $scope.StoolBlood;
        }
        else {
            $scope.StoolBlood = '';
            document.getElementsByName("S12")[0].value = $scope.StoolBlood;
        }
        if (($filter('filter')($scope.StoolColor_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolColor = ($filter('filter')($scope.StoolColor_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S13")[0].value = $scope.StoolColor;
        }
        else {
            $scope.StoolColor = '';
            document.getElementsByName("S13")[0].value = $scope.StoolColor;
        }
        if (($filter('filter')($scope.PhyOther01_Stool, { IsDefault: true })).length > 0) {
            $scope.PhyOther01 = ($filter('filter')($scope.PhyOther01_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S15")[0].value = $scope.PhyOther01;
        }
        else {
            $scope.PhyOther01 = '';
            document.getElementsByName("S15")[0].value = $scope.PhyOther01;
        }
        if (($filter('filter')($scope.StoolMucus_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolMucus = ($filter('filter')($scope.StoolMucus_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S14")[0].value = $scope.StoolMucus;
        }
        else {
            $scope.StoolMucus = '';
            document.getElementsByName("S14")[0].value = $scope.StoolMucus;
        }
        if (($filter('filter')($scope.PhyOther02_Stool, { IsDefault: true })).length > 0) {
            $scope.PhyOther02 = ($filter('filter')($scope.PhyOther02_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S16")[0].value = $scope.PhyOther02;
        }
        else {
            $scope.PhyOther02 = '';
            document.getElementsByName("S16")[0].value = $scope.PhyOther02;
        }
        if (($filter('filter')($scope.StoolHelminths_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolHelminths = ($filter('filter')($scope.StoolHelminths_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S17")[0].value = $scope.StoolHelminths;
        }
        else {
            $scope.StoolHelminths = '';
            document.getElementsByName("S17")[0].value = $scope.StoolHelminths;
        }
        if (($filter('filter')($scope.StoolOdour_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolOdour = ($filter('filter')($scope.StoolOdour_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S18")[0].value = $scope.StoolOdour;
        }
        else {
            $scope.StoolOdour = '';
            document.getElementsByName("S18")[0].value = $scope.StoolOdour;
        }

        //Stool Chemical Examination
        if (($filter('filter')($scope.StoolReaction_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolReaction = ($filter('filter')($scope.StoolReaction_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S21")[0].value = $scope.StoolReaction;
        }
        else {
            $scope.StoolReaction = '';
            document.getElementsByName("S21")[0].value = $scope.StoolReaction;
        }
        if (($filter('filter')($scope.CheOther01_Stool, { IsDefault: true })).length > 0) {
            $scope.CheOther01 = ($filter('filter')($scope.CheOther01_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S24")[0].value = $scope.CheOther01;
        }
        else {
            $scope.CheOther01 = '';
            document.getElementsByName("S24")[0].value = $scope.CheOther01;
        }
        if (($filter('filter')($scope.StoolOccultBloodTest_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolOccultBloodTest = ($filter('filter')($scope.StoolOccultBloodTest_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S22")[0].value = $scope.StoolOccultBloodTest;
        }
        else {
            $scope.StoolOccultBloodTest = '';
            document.getElementsByName("S22")[0].value = $scope.StoolOccultBloodTest;
        }
        if (($filter('filter')($scope.CheOther02_Stool, { IsDefault: true })).length > 0) {
            $scope.CheOther02 = ($filter('filter')($scope.CheOther02_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S25")[0].value = $scope.CheOther02;
        }
        else {
            $scope.CheOther02 = '';
            document.getElementsByName("S25")[0].value = $scope.CheOther02;
        }
        if (($filter('filter')($scope.StoolReducingSubstance_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolReducingSubstance = ($filter('filter')($scope.StoolReducingSubstance_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S23")[0].value = $scope.StoolReducingSubstance;
        }
        else {
            $scope.StoolReducingSubstance = '';
            document.getElementsByName("S23")[0].value = $scope.StoolReducingSubstance;
        }
        if (($filter('filter')($scope.CheOther03_Stool, { IsDefault: true })).length > 0) {
            $scope.CheOther03 = ($filter('filter')($scope.CheOther03_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S26")[0].value = $scope.CheOther03;
        }
        else {
            $scope.CheOther03 = '';
            document.getElementsByName("S26")[0].value = $scope.CheOther03;
        }

        //Stool Microscopeic Examination
        
        if (($filter('filter')($scope.StoolPusCells_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolPusCells = ($filter('filter')($scope.StoolPusCells_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S31")[0].value = $scope.StoolPusCells;
        }
        else {
            $scope.StoolPusCells = '';
            document.getElementsByName("S31")[0].value = $scope.StoolPusCells;
        }
        if (($filter('filter')($scope.StoolCystEHistolytica_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolCystEHistolytica = ($filter('filter')($scope.StoolCystEHistolytica_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S32")[0].value = $scope.StoolCystEHistolytica;
        }
        else {
            $scope.StoolCystEHistolytica = '';
            document.getElementsByName("S32")[0].value = $scope.StoolCystEHistolytica;
        }
        if (($filter('filter')($scope.StoolCharcotLyden_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolCharcotLyden = ($filter('filter')($scope.StoolCharcotLyden_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S33")[0].value = $scope.StoolCharcotLyden;
        }
        else {
            $scope.StoolCharcotLyden = '';
            document.getElementsByName("S33")[0].value = $scope.StoolCharcotLyden;
        }
        if (($filter('filter')($scope.StoolEpithelialcells_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolEpithelialcells = ($filter('filter')($scope.StoolEpithelialcells_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S34")[0].value = $scope.StoolEpithelialcells;
        }
        else {
            $scope.StoolEpithelialcells = '';
            document.getElementsByName("S34")[0].value = $scope.StoolEpithelialcells;
        }
        if (($filter('filter')($scope.StoolGlardiaLamblia_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolGlardiaLamblia = ($filter('filter')($scope.StoolGlardiaLamblia_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S35")[0].value = $scope.StoolGlardiaLamblia;
        }
        else {
            $scope.StoolGlardiaLamblia = '';
            document.getElementsByName("S35")[0].value = $scope.StoolGlardiaLamblia;
        }
        if (($filter('filter')($scope.StoolCrystalsMucus_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolCrystalsMucus = ($filter('filter')($scope.StoolCrystalsMucus_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S36")[0].value = $scope.StoolCrystalsMucus;
        }
        else {
            $scope.StoolCrystalsMucus = '';
            document.getElementsByName("S36")[0].value = $scope.StoolCrystalsMucus;
        }
        if (($filter('filter')($scope.StoolRbc_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolRbc = ($filter('filter')($scope.StoolRbc_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S37")[0].value = $scope.StoolRbc;
        }
        else {
            $scope.StoolRbc = '';
            document.getElementsByName("S37")[0].value = $scope.StoolRbc;
        }
        if (($filter('filter')($scope.StoolAscarisLumbricoides_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolAscarisLumbricoides = ($filter('filter')($scope.StoolAscarisLumbricoides_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S38")[0].value = $scope.StoolAscarisLumbricoides;
        }
        else {
            $scope.StoolAscarisLumbricoides = '';
            document.getElementsByName("S38")[0].value = $scope.StoolAscarisLumbricoides;
        }
        if (($filter('filter')($scope.StoolYeastCells_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolYeastCells = ($filter('filter')($scope.StoolYeastCells_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S39")[0].value = $scope.StoolYeastCells;
        }
        else {
            $scope.StoolYeastCells = '';
            document.getElementsByName("S39")[0].value = $scope.StoolYeastCells;
        }
        if (($filter('filter')($scope.StoolVegetableCells_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolVegetableCells = ($filter('filter')($scope.StoolVegetableCells_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S310")[0].value = $scope.StoolVegetableCells;
        }
        else {
            $scope.StoolVegetableCells = '';
            document.getElementsByName("S310")[0].value = $scope.StoolVegetableCells;
        }
        if (($filter('filter')($scope.StoolHymenolepisNana_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolHymenolepisNana = ($filter('filter')($scope.StoolHymenolepisNana_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S311")[0].value = $scope.StoolHymenolepisNana;
        }
        else {
            $scope.StoolHymenolepisNana = '';
            document.getElementsByName("S311")[0].value = $scope.StoolHymenolepisNana;
        }
        if (($filter('filter')($scope.StoolMuscleFibers_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolMuscleFibers = ($filter('filter')($scope.StoolMuscleFibers_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S312")[0].value = $scope.StoolMuscleFibers;
        }
        else {
            $scope.StoolMuscleFibers = '';
            document.getElementsByName("S312")[0].value = $scope.StoolMuscleFibers;
        }
        if (($filter('filter')($scope.StoolStarch_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolStarch = ($filter('filter')($scope.StoolStarch_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S313")[0].value = $scope.StoolStarch;
        }
        else {
            $scope.StoolStarch = '';
            document.getElementsByName("S313")[0].value = $scope.StoolStarch;
        }
        if (($filter('filter')($scope.StoolMacroPhage_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolMacroPhage = ($filter('filter')($scope.StoolMacroPhage_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S314")[0].value = $scope.StoolMacroPhage;
        }
        else {
            $scope.StoolMacroPhage = '';
            document.getElementsByName("S314")[0].value = $scope.StoolMacroPhage;
        }
        if (($filter('filter')($scope.StoolFatDroplets_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolFatDroplets = ($filter('filter')($scope.StoolFatDroplets_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S315")[0].value = $scope.StoolFatDroplets;
        }
        else {
            $scope.StoolFatDroplets = '';
            document.getElementsByName("S315")[0].value = $scope.StoolFatDroplets;
        }
        if (($filter('filter')($scope.StoolCandida_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolCandida = ($filter('filter')($scope.StoolCandida_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S328")[0].value = $scope.StoolCandida;
        }
        else {
            $scope.StoolCandida = '';
            document.getElementsByName("S328")[0].value = $scope.StoolCandida;
        }

        if (($filter('filter')($scope.StoolFatGlobule_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolFatGlobule = ($filter('filter')($scope.StoolFatGlobule_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S316")[0].value = $scope.StoolFatGlobule;
        }
        else {
            $scope.StoolFatGlobule = '';
            document.getElementsByName("S316")[0].value = $scope.StoolFatGlobule;
        }
        if (($filter('filter')($scope.MicOther01_Stool, { IsDefault: true })).length > 0) {
            $scope.MicOther01 = ($filter('filter')($scope.MicOther01_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S318")[0].value = $scope.MicOther01;
        }
        else {
            $scope.MicOther01 = '';
            document.getElementsByName("S318")[0].value = $scope.MicOther01;
        }
        if (($filter('filter')($scope.StoolEhistolytica_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolEhistolytica = ($filter('filter')($scope.StoolEhistolytica_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S317")[0].value = $scope.StoolEhistolytica;
        }
        else {
            $scope.StoolEhistolytica = '';
            document.getElementsByName("S317")[0].value = $scope.StoolEhistolytica;
        }
        if (($filter('filter')($scope.MicOther02_Stool, { IsDefault: true })).length > 0) {
            $scope.MicOther02 = ($filter('filter')($scope.MicOther02_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S319")[0].value = $scope.MicOther02;
        }
        else {
            $scope.MicOther02 = '';
            document.getElementsByName("S319")[0].value = $scope.MicOther02;
        }
        if (($filter('filter')($scope.StoolStarchGranules_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolStarchGranules = ($filter('filter')($scope.StoolStarchGranules_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S320")[0].value = $scope.StoolStarchGranules;
        }
        else {
            $scope.StoolStarchGranules = '';
            document.getElementsByName("S320")[0].value = $scope.StoolStarchGranules;
        }
        if (($filter('filter')($scope.Mucus_Stool, { IsDefault: true })).length > 0) {
            $scope.Mucus = ($filter('filter')($scope.Mucus_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S321")[0].value = $scope.Mucus;
        }
        else {
            $scope.Mucus = '';
            document.getElementsByName("S321")[0].value = $scope.Mucus;
        }
        if (($filter('filter')($scope.EColi_Stool, { IsDefault: true })).length > 0) {
            $scope.EColi = ($filter('filter')($scope.EColi_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S322")[0].value = $scope.EColi;
        }
        else {
            $scope.EColi = '';
            document.getElementsByName("S322")[0].value = $scope.EColi;
        }
        if (($filter('filter')($scope.StoolCystGiardialamblia_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolCystGiardialamblia = ($filter('filter')($scope.StoolCystGiardialamblia_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S323")[0].value = $scope.StoolCystGiardialamblia;
        }
        else {
            $scope.StoolCystGiardialamblia = '';
            document.getElementsByName("S323")[0].value = $scope.StoolCystGiardialamblia;
        }
        if (($filter('filter')($scope.CystEColi_Stool, { IsDefault: true })).length > 0) {
            $scope.CystEColi = ($filter('filter')($scope.CystEColi_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S324")[0].value = $scope.CystEColi;
        }
        else {
            $scope.CystEColi = '';
            document.getElementsByName("S324")[0].value = $scope.CystEColi;
        }
        if (($filter('filter')($scope.Ankylostoma_Stool, { IsDefault: true })).length > 0) {
            $scope.Ankylostoma = ($filter('filter')($scope.Ankylostoma_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S325")[0].value = $scope.Ankylostoma;
        }
        else {
            $scope.Ankylostoma = '';
            document.getElementsByName("S325")[0].value = $scope.Ankylostoma;
        }
        if (($filter('filter')($scope.StoolTrichuris_Stool, { IsDefault: true })).length > 0) {
            $scope.StoolTrichuris = ($filter('filter')($scope.StoolTrichuris_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S326")[0].value = $scope.StoolTrichuris;
        }
        else {
            $scope.StoolTrichuris = '';
            document.getElementsByName("S326")[0].value = $scope.StoolTrichuris;
        }
        if (($filter('filter')($scope.StrongStercoralis_Stool, { IsDefault: true })).length > 0) {
            $scope.StrongStercoralis = ($filter('filter')($scope.StrongStercoralis_Stool, { IsDefault: true }))[0].Value;
            document.getElementsByName("S327")[0].value = $scope.StrongStercoralis;
        }
        else {
            $scope.StrongStercoralis = '';
            document.getElementsByName("S327")[0].value = $scope.StrongStercoralis;
        }

        $http({
            method: "GET",
            url: "/LIS/Haematology/GetStoolExamResultByTestOrderId?testOrderId=" + ($scope.TestOrdId)
        }).success(function (response) {
            debugger;
            //$scope.SetStoolDefaults();

            if (response.Success == true) {
                $scope.LISStoolExamResult = response.stoolExmResMaster;

                var specimenId = $scope.LISStoolExamResult.SpecimenId;
                if (!specimenId) {
                    specimenId = 4;
                }
                $scope.StoolSpeciment = $filter('filter')($scope.Specimens, { Id: specimenId })[0];
                //$scope.StoolSpeciment = $scope.StoolSpeciment.Specimen;
                //$scope.LisStoolSpecimen = $scope.StoolSpeciment.Id;
                $scope.LisStoolSpecimen = $scope.StoolSpeciment.Id;
                $scope.StoolSpeciment = $scope.StoolSpeciment.Specimen;

                if ($scope.LISStoolExamResult.AnalyzerId > 0) {
                    $scope.StoolAnalyzerId = $scope.LISStoolExamResult.AnalyzerId;
                    $scope.StoolAnalyzer = $scope.StoolAnalyzers.filter(x => x.Id == $scope.StoolAnalyzerId)[0].AnalyzerName;

                }
                else {
                    $scope.StoolAnalyzerId = response.StoolAnalyzerId[0];
                    $scope.StoolAnalyzer = response.StoolAnalyzerName;

                }

                if ($scope.LISStoolExamResult.CheckedBySignId > 0) {
                    $scope.StoolCheckedBySignId = $scope.LISStoolExamResult.CheckedBySignId;
                    $scope.StoolCheckedBy = $scope.CheckedByList.filter(x => x.Id == $scope.StoolCheckedBySignId)[0];

                }
                else {
                    $scope.StoolCheckedBySignId = null;
                }

                if ($scope.LISStoolExamResult.MedicalTechologistSignId > 0) {
                    $scope.StoolMedicalTechologistSignId = $scope.LISStoolExamResult.MedicalTechologistSignId;
                    $scope.StoolMedicalTechologistBy = $scope.MedicalTechologistList.filter(x => x.Id == $scope.StoolMedicalTechologistSignId)[0];

                }
                else {
                    $scope.StoolMedicalTechologistSignId = null;
                }

                $scope.StoolSpecimenNote = $scope.LISStoolExamResult.SpecimenNote;

                //$scope.StoolSpeciment = $scope.LISStoolExamResult.SpecimenName;
                //$scope.LisStoolSpecimen = $scope.LISStoolExamResult.SpecimenId; // taking value for specimen Update.
                //$scope.StoolSpeciment = $scope.LISStoolExamResult.Sample;

                //$scope.StoolPrintStatus = $scope.LISStoolExamResult.ReportStatus; // for Print Status
                //$scope.StoolPathologist = response.pathologistId[0].ConsultantName;
                //$scope.StoolConsultantt = response.pathologistId[0].PthologistId;


                //$scope.StoolPathologistId = $scope.LISStoolExamResult.PthologistId;

                $scope.LISStoolExamResultDetails = response.stoolExamResultDetails;

                angular.forEach($scope.LISStoolExamResultDetails, function (item) {
                    document.getElementsByName(item.ParticularIdentityNo)[0].value = item.Result;

                    if (item.ParticularIdentityNo == "S11") {
                        $scope.StoolConsistency = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S12") {
                        $scope.StoolBlood = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S13") {
                        $scope.StoolColor = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S15") {
                        $scope.PhyOther01 = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S14") {
                        $scope.StoolMucus = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S16") {
                        $scope.PhyOther02 = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S17") {
                        $scope.StoolHelminths = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S18") {
                        $scope.StoolOdour = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S21") {
                        $scope.StoolReaction = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S24") {
                        $scope.CheOther01 = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S22") {
                        $scope.StoolOccultBloodTest = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S25") {
                        $scope.CheOther02 = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S23") {
                        $scope.StoolReducingSubstance = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S26") {
                        $scope.CheOther03 = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S31") {
                        $scope.StoolPusCells = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S32") {
                        $scope.StoolCystEHistolytica = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S33") {
                        $scope.StoolCharcotLyden = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S34") {
                        $scope.StoolEpithelialcells = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S35") {
                        $scope.StoolGlardiaLamblia = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S36") {
                        $scope.StoolCrystalsMucus = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S37") {
                        $scope.StoolRbc = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S38") {
                        $scope.StoolAscarisLumbricoides = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S39") {
                        $scope.StoolYeastCells = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S310") {
                        $scope.StoolVegetableCells = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S311") {
                        $scope.StoolHymenolepisNana = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S312") {
                        $scope.StoolMuscleFibers = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S313") {
                        $scope.StoolStarch = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S314") {
                        $scope.StoolMacroPhage = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S315") {
                        $scope.StoolFatDroplets = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S328") {
                        $scope.StoolCandida = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S316") {
                        $scope.StoolFatGlobule = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S318") {
                        $scope.MicOther01 = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S317") {
                        $scope.StoolEhistolytica = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S319") {
                        $scope.MicOther02 = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S320") {
                        $scope.StoolStarchGranules = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S321") {
                        $scope.Mucus = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S322") {
                        $scope.EColi = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S323") {
                        $scope.StoolCystGiardialamblia = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S324") {
                        $scope.CystEColi = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S325") {
                        $scope.Ankylostoma = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S326") {
                        $scope.StoolTrichuris = item.Result;
                    }
                    else if (item.ParticularIdentityNo == "S327") {
                        $scope.StrongStercoralis = item.Result;
                    }

                    //angular.element(document.getElementsByName(item.ParticularIdentityNo)[0]).scope().val = item.Result;


                    if (item.Particulars == "SPE-Other01") {
                        $scope.particulars4 = item.OtherParticulars;
                    }
                    else if (item.Particulars == "SPE-Other02") {
                        $scope.particulars5 = item.OtherParticulars;
                    }
                    else if (item.Particulars == "SCE-Other01") {
                        $scope.particulars9 = item.OtherParticulars;
                    }
                    else if (item.Particulars == "SCE-Other02") {
                        $scope.particulars10 = item.OtherParticulars;
                    }
                    else if (item.Particulars == "SCE-Other03") {
                        $scope.particulars11 = item.OtherParticulars;
                    }
                    else if (item.Particulars == "SME-Other01") {
                        $scope.particulars290 = item.OtherParticulars;
                    }
                    else if (item.Particulars == "SME-Other02") {
                        $scope.particulars300 = item.OtherParticulars;
                    }
                });

                $scope.StoolPrintStatus = $scope.LISStoolExamResult.ReportStatus; // These are shifted down here from top...!
                debugger;
                if (response.pathologistId.length > 0) {
                    $scope.StoolPathologist = {
                        "ConsultantName": response.pathologistId[0].ConsultantName,
                        "Id": response.pathologistId[0].PathologistId
                    };
                    if (response.pathologistId2.length > 0) {
                        $scope.StoolPathologistSearchtwo = response.pathologistId2[0].PathologistId2;
                        $scope.StoolPathologisttwo = $scope.Consultants.filter(x => x.Id == $scope.StoolPathologistSearchtwo)[0];
                    }
                    if (response.pathologistId3.length > 0) {
                        $scope.StoolPathologistSearchthree = response.pathologistId3[0].PathologistId3;
                        $scope.StoolPathologistthree = $scope.Consultants.filter(x => x.Id == $scope.StoolPathologistSearchthree)[0];
                    }
                    //$scope.StoolPathologist.ConsultantName = response.pathologistId[0].ConsultantName;
                    //$scope.StoolPathologist.Id = response.pathologistId[0].PthologistId;

                    $scope.StoolConsultantt = response.pathologistId[0].PthologistId;
                    $scope.StoolPathologistSearch = $scope.StoolConsultantt;
                }
                else {
                    $scope.StoolPathologist = {
                        "ConsultantName": '',
                        "Id": 0
                    };

                    var lastStoolTechnician = $.cookie("lastStoolTechnician");
                    if (lastStoolTechnician != undefined) {
                        $scope.StoolPathologist = JSON.parse(lastStoolTechnician);
                        $scope.StoolConsultantt = $scope.StoolPathologist.Id;
                        $scope.StoolPathologistSearch = $scope.StoolConsultantt;
                    }
                    

                }
                if ($scope.StoolCheckbox == true) {
                    var lastStoolTechnician = $.cookie("lastStoolTechnician");
                    $scope.StoolPathologist = JSON.parse(lastStoolTechnician);
                }
                //$scope.StoolPathologist = response.pathologistId[0].ConsultantName;
                //$scope.StoolConsultantt = response.pathologistId[0].PthologistId;

                $scope.PrintedBy_Stool = $scope.LISStoolExamResult.printedBy;
                $scope.PrintedTime_Stool = $scope.LISStoolExamResult.printedTime;
            }
            else {

                var lastStoolTechnician = $.cookie("lastStoolTechnician");
                if (lastStoolTechnician != undefined) {
                    $scope.StoolPathologist = JSON.parse(lastStoolTechnician);
                    $scope.StoolConsultantt = $scope.StoolPathologist.Id;
                    $scope.StoolPathologistSearch = $scope.StoolConsultantt;
                }
                
                $scope.StoolSpeciment = $filter('filter')($scope.Specimens, { Id: 4 })[0];
                $scope.LisStoolSpecimen = $scope.StoolSpeciment.Id;
                $scope.StoolSpeciment = $scope.StoolSpeciment.Specimen;

                // For Default value Setting(Starts)...
                //$scope.StoolSpeciment = response.SpecimenName;
                //$scope.LisStoolSpecimen = response.SpecimenId; // taking value for specimen Update. new

                //$scope.StoolConsistency = response.StoolConsistency;
                //$scope.StoolColor = response.StoolColor;
                //$scope.StoolReaction = response.StoolReaction;
                //$scope.StoolPusCells = response.StoolPusCells;
                //$scope.StoolEpithelialcells = response.StoolEpithelialcells;

                //$scope.StoolRbc = response.RBC;

                //$scope.SetStoolDefaults();
                //$scope.setStoolDefaultValue();
                //$scope.LISStoolExamResult = {}; // off on 02062018 dated.
                //$scope.LISStoolExamResultDetails = [];
                //angular.forEach($scope.stoolExamParticulars, function (item) {
                //    document.getElementsByName(item.ParticularIdentityNo)[0].value = null;
                //});
            }
        }).error(function myError(response) {
            //$scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });
        });
    }

    $scope.GetStoolExamResultByTestOrderId = function () {
        $scope.setStoolDefaultValue(); 
    };

    $scope.changeFocusSerology = function (event, fieldName) {
        var serologyLength = $scope.Serologys.length;
        if (serologyLength < fieldName) {
            event.preventDefault();
            var field = document.getElementsByName('Save_serology');
            $('.Save_serology').removeClass('btn-success');
            $('.Save_serology').addClass('btn-danger');
        }
        else {
            var field = document.getElementsByName('SerologyTestResult_' + fieldName);
        }
        field[0].focus();
        field[0].select();
    };

    $scope.changeFocusBioChemical = function (event, fieldName) {
        var biochemicalLength = $scope.BioChemicalResults.length;
        if (biochemicalLength < fieldName) {
            event.preventDefault();
            var field = document.getElementsByName('Save_biochemical');
            $('.Save_biochemical').removeClass('btn-success');
            $('.Save_biochemical').addClass('btn-danger');
        }
        else {
            var field = document.getElementsByName('BiochemicalTestResult_' + fieldName);
        }
        field[0].focus();
        field[0].select();
    };

    $scope.changeFocusMicroBiologyChemical = function (e, type, position) {
        e.preventDefault();
        var field;
        if (type == 1) {
            field = document.getElementsByName('Diameter_' + position);
        }
        else if (type == 2) {
            field = document.getElementsByName('InterpritationDetail_' + position);
        }
        else if (type == 3) {
            field = document.getElementsByName('InterpritationDetailb_' + position);
        }
        else if (type == 4) {
            field = document.getElementsByName('InterpritationDetailc_' + position);
        }
        else if (type == 5) {
            field = document.getElementsByName('MicroBoiDetail_' + position);
        }
        field[0].focus();
        field[0].select();
        field[0].click();

    };

    $scope.changeFocusHormones = function (event, fieldName) {
        var HormonesLength = $scope.Hormones.length;
        if (HormonesLength < fieldName) {
            event.preventDefault();
            var field = document.getElementsByName('Save_Hormones');
            $('.Save_Hormones').removeClass('btn-success');
            $('.Save_Hormones').addClass('btn-danger');
        }
        else {
            var fieldN = 'HormonesTestResult_' + fieldName;
            var field = document.getElementsByName(fieldN);
        }
        field[0].focus();
        field[0].select();
        //setTimeout(function () {
        //    //$("input[name='HormonesTestResult_2']").focus();
        //    $('#HormonesTestResult_2').focus()
        //},50);
    };


    $scope.changeFocusUrineTab = function (event, fieldName) {

        if (fieldName == "SaveUrinExamResult") {
            event.preventDefault();
            var field = document.getElementsByName(fieldName);
            $('.SaveUrinExamResult').removeClass('btn-success');
            $('.SaveUrinExamResult').addClass('btn-danger');
        }
        else {
            var field = document.getElementsByName(fieldName);
        }

        // var field = document.getElementsByName(fieldName);

        field[0].focus();
        field[0].select();
    };

    $scope.changeFocusStoolTab = function (event, fieldName) {

        if (fieldName == "SaveStoolExamResult") {
            event.preventDefault();
            var field = document.getElementsByName(fieldName);
            $('.SaveStoolExamResult').removeClass('btn-success');
            $('.SaveStoolExamResult').addClass('btn-danger');
        }
        else {
            var field = document.getElementsByName(fieldName);
        }

        // var field = document.getElementsByName(fieldName);

        field[0].focus();
        field[0].select();
    };

    $scope.changeFocusLab = function (event, fieldName) {
        var labLength = $scope.LabExamResults.length;
        if (labLength < fieldName) {
            event.preventDefault();
            var field = document.getElementsByName('Save_lab');
            $('.Save_lab').removeClass('btn-success');
            $('.Save_lab').addClass('btn-danger');
        }
        else {
            var field = document.getElementsByName('LabTestResult_' + fieldName);
        }
        field[0].focus();
        field[0].select();
    };


    $scope.changeFocusOnSaveButton = function (event, fieldName) {
        event.preventDefault();
        var field = document.getElementsByName(fieldName);
        $('.' + fieldName).removeClass('btn-success');
        $('.' + fieldName).addClass('btn-danger');
        field[0].focus();
        field[0].select();
    };


    $scope.GetLabResultById = function () {
        
        $http({
            method: "POST",
            url: "/LIS/Haematology/GetLabResultById?id=" + ($scope.TestOrdId)
        }).success(function (response) {
            debugger;
            $scope.LabExamResults = $filter('filter')(response.testParticulars, { TestGroupId: 35 });

            $scope.LabReportPrintStatus = response.PrintStatus; // For Getting 'PrintStatus'...!

            //$scope.LabPathologist = response.pathologistId[0].ConsultantName;
            //$scope.LabConsultantt = response.pathologistId[0].PathologistId;

            if ($scope.LabExamResults.length > 0) {

                if ($scope.LabExamResults[0].AnalyzerId > 0) {
                    $scope.LabAnalyzerId = $scope.LabExamResults[0].AnalyzerId;
                    $scope.LabAnalyzer = $scope.LabAnalyzers.filter(x => x.Id == $scope.LabAnalyzerId)[0].AnalyzerName;

                }
                else {
                    $scope.LabAnalyzerId = response.LabAnalyzerId[0];
                    $scope.LabAnalyzer = response.LabAnalyzerName;

                }
                $scope.LabSpecimenNote = $scope.LabExamResults[0].SpecimenNote;

                $scope.LabCheckedBySignId = null;
                $scope.LabMedicalTechologistSignId = null;
                angular.forEach($scope.LabExamResults, function (item) {
                    if ($scope.LabCheckedBySignId == null) {
                        $scope.LabCheckedBySignId = item.CheckedBySignId;
                    }
                    if ($scope.LabMedicalTechologistSignId == null) {
                        $scope.LabMedicalTechologistSignId = item.MedicalTechologistSignId;
                    }
                });

                if ($scope.LabCheckedBySignId > 0) {
                    $scope.LabCheckedBy = $scope.CheckedByList.filter(x => x.Id == $scope.LabCheckedBySignId)[0];
                }
                else {
                    $scope.LabCheckedBySignId = null;
                }

                if ($scope.LabMedicalTechologistSignId > 0) {
                    $scope.LabMedicalTechologistBy = $scope.MedicalTechologistList.filter(x => x.Id == $scope.LabMedicalTechologistSignId)[0];
                }
                else {
                    $scope.LabMedicalTechologistSignId = null;
                }

                if ($scope.LabExamResults[0].ReportTopHeading != null) {
                    $scope.LabReportTopHeading = $scope.LabExamResults[0].ReportTopHeading;
                }

                angular.forEach($scope.LabExamResults, function (item) {

                    $scope.LabSpeciment = item.SpecimenName;
                    $scope.LabResultSpecimen = item.SpecimenId; // taking value for specimen Update.

                    var result = item.TestResult || null;
                    if (result != null) {
                        $scope.LabExamResult.PrimaryId = 1;
                        debugger;
                        //$scope.LabSpeciment = item.SpecimenName;
                        //$scope.LabResultSpecimen = item.SpecimenId; // taking value for specimen Update.
                        if (response.pathologistId.length > 0) {
                            $scope.LabPathologist = {
                                "ConsultantName": response.pathologistId[0].ConsultantName,
                                "Id": response.pathologistId[0].PathologistId
                            };
                            if (response.pathologistId2.length > 0) {
                                $scope.LabPathologistSearchtwo = response.pathologistId2[0].PathologistId2;
                                $scope.LabPathologisttwo = $scope.Consultants.filter(x => x.Id == $scope.LabPathologistSearchtwo)[0];
                            }
                            if (response.pathologistId3.length> 0) {
                                $scope.LabPathologistSearchthree = response.pathologistId3[0].PathologistId3;
                                $scope.LabPathologistthree = $scope.Consultants.filter(x => x.Id == $scope.LabPathologistSearchthree)[0];
                            }

                            $scope.LabConsultantt = response.pathologistId[0].PathologistId;
                            $scope.LabPathologistSearch = $scope.LabConsultantt;
                       
                        }
                        else {
                            $scope.LabPathologist = {
                                "ConsultantName": '',
                                "Id": 0
                            };

                            var lastLabReportTechnician = $.cookie("lastLabReportTechnician");
                            if (lastLabReportTechnician != undefined) {
                                $scope.LabPathologist = JSON.parse(lastLabReportTechnician);
                                $scope.LabConsultantt = $scope.LabPathologist.Id;
                                $scope.LabPathologistSearch = $scope.LabConsultantt;
                            }
                            

                        }
                       
                    }
                    if ($scope.LabReportCheckbox == true) {
                        var lastLabReportTechnician = $.cookie("lastLabReportTechnician");
                        $scope.LabPathologist = JSON.parse(lastLabReportTechnician);
                    }
                });

                $scope.PrintedBy_Lab = response.printedBy;
                $scope.PrintedTime_Lab = response.printedTime;
            }
            else {
                var lastLabReportTechnician = $.cookie("lastLabReportTechnician");
                if (lastLabReportTechnician != undefined) {
                    $scope.LabPathologist = JSON.parse(lastLabReportTechnician);
                    $scope.LabConsultantt = $scope.LabPathologist.Id;
                    $scope.LabPathologistSearch = $scope.LabConsultantt;
                }
                
            }

           

            //=============ZahidVai(Starts)============================
            //if ($scope.LabExamResults.length != 0) {

            //    $scope.LabExamResult.PrimaryId = 0;
            //    angular.forEach($scope.LabExamResults, function (item) {
            //        if (item.PrimaryId == 1) {
            //            $scope.LabExamResult.PrimaryId = 1;

            //            $scope.LabSpeciment = item.SpecimenName;
            //            $scope.LabResultSpecimen = item.SpecimenId; // taking value for specimen Update.

            //            $scope.LabPathologist = response.pathologistId[0].ConsultantName;
            //            $scope.LabConsultantt = response.pathologistId[0].PathologistId;
            //        }
            //    });
            //}
            //=============ZahidVai(Ends)============================


        }).error(function (response) {
        });
    }

    $scope.ApprovedLisUrinExamResult = function (testGroup) {

        var orderId = $scope.TestOrdId || null;
        var emptyUrin = $scope.LISUrinExamResultDetails.length < 1 ? 0 : 1;

        var CheckedById = $scope.UrineCheckedBySignId || null;
        var MedicalTechologistById = $scope.UrineMedicalTechologistSignId || null;

        if ($scope.CompanyName == "INSAF BARAKAH KIDNEY & GENERAL HOSPITAL") {
            if (CheckedById == null || MedicalTechologistById == null) {
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Please select the CheckedBy and MedicalTechologistBy' });
                return;
            }
        }

        if (orderId != null && emptyUrin != 0) {
            $http({
                method: "POST",
                url: "/LIS/Haematology/ApprovedLisUrinExamResult",
                data: { testOrderNo: orderId, testGroupId: testGroup }
            }).success(function (response) {
                if (response.Success == true) {
                    $scope.UrinPrintStatus = response.approvalPrintStatus;
                    $scope.IsClickedUrine = 3;
                    $scope.alerts.push({ 'type': 'success', 'msg': 'Approved successfully' });
                }
            }).error(function (response) {
                $scope.alerts.push({ 'type': 'info', 'msg': 'Approved failed' });
            });
        }
        else {
            $scope.alerts.push({ 'type': 'info', 'msg': 'There is no urin exam result' });
            $window.scrollTo(0, 0);
            return;
        }
    };

    $scope.ApprovedLisStoolExamResult = function (testGroup) {

        var orderId = $scope.TestOrdId || null;
        var emptyStool = $scope.LISStoolExamResultDetails.length < 1 ? 0 : 1;

        var CheckedById = $scope.StoolCheckedBySignId || null;
        var MedicalTechologistById = $scope.StoolMedicalTechologistSignId || null;

        if ($scope.CompanyName == "INSAF BARAKAH KIDNEY & GENERAL HOSPITAL") {
            if (CheckedById == null || MedicalTechologistById == null) {
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Please select the CheckedBy and MedicalTechologistBy' });
                return;
            }
        }

        if (orderId != null && emptyStool != 0) {
            $http({
                method: "POST",
                url: "/LIS/Haematology/ApprovedLisStoolExamResult",
                data: { testOrderNo: orderId, testGroupId: testGroup }
            }).success(function (response) {
                if (response.Success == true) {
                    $scope.StoolPrintStatus = response.approvalPrintStatus;
                    $scope.IsClickedStool = 3;
                    $scope.alerts.push({ 'type': 'success', 'msg': 'Approved successfully' });
                }
            }).error(function (response) {
                $scope.alerts.push({ 'type': 'info', 'msg': 'Approved failed' });
            });
        }
        else {
            $scope.alerts.push({ 'type': 'info', 'msg': 'There is no stool exam result' });
            $window.scrollTo(0, 0);
            return;
        }
    };

    $scope.ApprovedLisLabReportResult = function (testGroup) {

        var orderId = $scope.TestOrdId || null;
        var emptyLab = 0;

        if ($scope.LabExamResults.length != 0) {
            angular.forEach($scope.LabExamResults, function (item) {
                var result = item.TestResult || null;
                if (result != null) {
                    emptyLab = 1;
                }
            });
        }
        else {
            emptyLab = 0;
        }

        var CheckedById = $scope.LabCheckedBySignId || null;
        var MedicalTechologistById = $scope.LabMedicalTechologistSignId || null;

        if ($scope.CompanyName == "INSAF BARAKAH KIDNEY & GENERAL HOSPITAL") {
            debugger;
            if (CheckedById == null || MedicalTechologistById == null) {
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Please select the CheckedBy and MedicalTechologistBy' });
                return;
            }
        }

        if (orderId != null && emptyLab != 0) {
            $http({
                method: "POST",
                url: "/LIS/Haematology/ApprovedLisLabReportResult",
                data: { testOrderNo: orderId, testGroupId: testGroup }
            }).success(function (response) {
                if (response.Success == true) {
                    $scope.LabReportPrintStatus = response.approvalPrintStatus;
                    $scope.IsClickedLabReport = 3;
                    $scope.alerts.push({ 'type': 'success', 'msg': 'Approved successfully' });
                }
            }).error(function (response) {
                $scope.alerts.push({ 'type': 'info', 'msg': 'Approved failed' });
            });
        }
        else {
            $scope.alerts.push({ 'type': 'info', 'msg': 'There is no lab report result' });
            $window.scrollTo(0, 0);
            return;
        }
    };

    $scope.LabSpecimenName = "";
    $scope.OnSelectLabResultSpecimen = function (val) {
        $scope.LabResultSpecimen = val.Id;
        $scope.LabSpecimenName = val.Specimen;
    }
    $scope.UrinSpecimentName = "";
    $scope.OnSelectUrinSpecimen = function (val) {
        $scope.UrineSpecimen = val.Id;
        $scope.UrinSpecimentName = val.Specimen;
    }

    $scope.HaematologySpecimentName = "";
    $scope.OnSelectHaematologySpecimen = function (val) {
        $scope.HaematologySpecimenId = val.Id;
        $scope.HaematologySpecimentName = val.Specimen;
    }

    $scope.StoolSpecimentName = "";
    $scope.OnSelectStoolSpecimen = function (val) {
        $scope.LisStoolSpecimen = val.Id;
        $scope.StoolSpecimentName = val.Specimen;
    }

    //=================================================== Zahid Part End ======================================================

    // for Individual data save logic for TotalDC%...!
    $scope.makeTotalDC100 = {};
    $scope.SetDefaultTotalDC = function () {
        if ($scope.makeTotalDC100 == true) {
            $scope.LisPatient.TotalDc = 100;
        }
        else {
            $scope.LisPatient.TotalDc = 0;
        }
    };

    //=================HGB(Starts)=====================   
    //$scope.HGB = {};
    $scope.SetHGB = function () {
        if ($scope.HGBChecked == true) {
            $scope.LisPatient.LisHematologys.push($scope.HGB);
        }
        else {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.HGB);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
    };
    //===================HGB(Ends)=====================

    //=================Other01(Starts)=================
    //$scope.Other01 = {};
    $scope.SetOther01 = function () {
        if ($scope.Other01Checked == true) {
            $scope.LisPatient.LisHematologys.push($scope.Other01);
        }
        else {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.Other01);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
    };

    //===================Other01(End)==================

    //=================Other02(Starts)================
    //$scope.Other02 = {};
    $scope.SetOther02 = function () {
        if ($scope.Other02Checked == true) {
            $scope.LisPatient.LisHematologys.push($scope.Other02);
        }
        else {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.Other02);
            $scope.LisPatient.LisHematologys.splice(index, 1);
            $scope.Other02 = {};
        }
        $scope.CalculateTotalDC();
    };

    //===================Other02(End)==================

    //=================Other03(Without Total DC % Calculation Starts)================
    //$scope.Other03 = {};
    $scope.SetOther03 = function () {
        if ($scope.Other03Checked == true) {
            $scope.LisPatient.LisHematologys.push($scope.Other03);
        }
        else {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.Other03);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
    };

    //===================Other02(End)==================

    //===================ESR(Starts)===================
    //$scope.ESR = {};
    $scope.SetESR = function () {
        if ($scope.ESRChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.ESR);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.ESR);
        }
    };
    //===================ESR(End)======================

    //===================WBC(Starts)===================
    //$scope.WBC = {};
    $scope.SetWBC = function () {
        if ($scope.WBCChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.WBC);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.WBC);
        }
    };
    //===================WBC(End)======================

    //===================PLT(Starts)===================
    //$scope.PLT = {};
    $scope.SetPLT = function () {
        if ($scope.PLTChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.PLT);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.PLT);
        }
    };
    //===================PLT(End)======================

    //===================RDW(Starts)===================
    //$scope.RDW = {};
    $scope.SetRDW = function () {
        if ($scope.RDWChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.RDW);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.RDW);
        }
    };
    //===================RDW(End)======================

    //===================BT(Starts)====================
    //$scope.BT = {};
    //$scope.BTSecond = {};
    $scope.SetBT = function () {
        if ($scope.BTChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.BT);
            $scope.LisPatient.LisHematologys.splice(index, 1);

            var index2 = $scope.LisPatient.LisHematologys.indexOf($scope.BTSecond);
            $scope.LisPatient.LisHematologys.splice(index2, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.BT);
            $scope.LisPatient.LisHematologys.push($scope.BTSecond);
        }
    };
    //===================BT(End)=======================

    //===================NEU(Starts)===================
    //$scope.NEU = {};
    $scope.SetNEU = function () {
        if ($scope.NEUChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.NEU);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.NEU);
        }
        $scope.CalculateTotalDC();
    };
     //===================NEU(End)======================

    $scope.SetNeutrophil = function () {
        if ($scope.NeutrophilChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.Neutrophil);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.Neutrophil);
        }
    };


    $scope.SetLymphocyte = function () {
        if ($scope.LymphocyteChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.Lymphocyte);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.Lymphocyte);
        }
    };

    $scope.SetMonocyte = function () {
        if ($scope.MonocyteChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.Monocyte);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.Monocyte);
        }
    };

    $scope.SetEosinophil = function () {
        if ($scope.MonocyteChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.Eosinophil);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.Eosinophil);
        }
    };
    $scope.SetBasophil = function () {
        if ($scope.BasophilChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.Basophil);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.Basophil);
        }
    };
   

    //===================RBC(Starts)===================
    //$scope.RBC = {};
    $scope.SetRBC = function () {
        if ($scope.RBCChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.RBC);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.RBC);
        }
    };
    //===================RBC(End)======================

    //===================MPV(Starts)===================
    //$scope.MPV = {};
    $scope.SetMPV = function () {
        if ($scope.MPVChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.MPV);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.MPV);
        }
    };
    //===================MPV(End)======================

    //===================CT(Starts)====================
    //$scope.CT = {};
    //$scope.CTSecond = {};
    $scope.SetCT = function () {
        if ($scope.CTChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.CT);
            $scope.LisPatient.LisHematologys.splice(index, 1);

            var index2 = $scope.LisPatient.LisHematologys.indexOf($scope.CTSecond);
            $scope.LisPatient.LisHematologys.splice(index2, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.CT);
            $scope.LisPatient.LisHematologys.push($scope.CTSecond);
        }
    };
    //===================CT(End)=======================

    //===================LYM(Starts)===================
    //$scope.LYM = {};
    $scope.SetLYM = function () {
        if ($scope.LYMChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.LYM);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.LYM);
        }
        $scope.CalculateTotalDC();
    };
    //===================LYM(End)======================

    //===================HCT(Starts)===================
    //$scope.HCT = {};
    $scope.SetHCT = function () {
        if ($scope.HCTChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.HCT);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.HCT);
        }
    };
    //===================HCT(End)======================

    //===================PDW(Starts)===================
    //$scope.PDW = {};
    $scope.SetPDW = function () {
        if ($scope.PDWChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.PDW);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.PDW);
        }
    };
    //===================PDW(End)======================

    //===================CE(Starts)====================
    //$scope.CE = {};
    $scope.SetCE = function () {
        if ($scope.CEChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.CE);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.CE);
        }
    };
    //===================CE(End)=======================

    //===================MON(Starts)===================
    //$scope.MON = {};
    $scope.SetMON = function () {
        if ($scope.MONChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.MON);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.MON);
        }
        $scope.CalculateTotalDC();
    };
    //===================MON(End)======================

    //===================MCV(Starts)===================
    //$scope.MCV = {};
    $scope.SetMCV = function () {

        if ($scope.MCVChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.MCV);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.MCV);
        }
    };
    //===================MCV(End)======================

    //===================MP(Starts)===================
    //$scope.MP = {};
    $scope.SetMP = function () {
        if ($scope.MPChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.MP);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.MP);
        }
    };
    //===================MP(End)======================

    //===================EC(Starts)====================
    //$scope.EC = {};
    $scope.SetEC = function () {
        if ($scope.ECChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.EC);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.EC);
        }
    };
    //===================EC(End)=======================

    //===================EOS(Starts)===================
    //$scope.EOS = {};
    $scope.SetEOS = function () {
        if ($scope.EOSChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.EOS);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.EOS);
        }
        $scope.CalculateTotalDC();
    };
    //===================EOS(End)======================

    //===================MCH(Starts)===================
    //$scope.MCH = {};
    $scope.SetMCH = function () {
        if ($scope.MCHChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.MCH);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.MCH);
        }
    };
    //===================MCH(End)======================

    //===================MPC(Starts)===================
    //$scope.MPC = {};
    $scope.SetMPC = function () {
        if ($scope.MPCChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.MPC);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.MPC);
        }
    };
    //===================MPC(End)======================

    //===================RC(Starts)====================
    //$scope.RC = {};
    $scope.SetRC = function () {
        if ($scope.RCChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.RC);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.RC);
        }
    };
    //===================RC(End)=======================

    //===================BAS(Starts)===================
    //$scope.BAS = {};
    $scope.SetBAS = function () {
        if ($scope.BASChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.BAS);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.BAS);
        }
        $scope.CalculateTotalDC();
    };
    //===================BAS(End)======================

    //===================MCHC(Starts)==================
    //$scope.MCHC = {};
    $scope.SetMCHC = function () {
        if ($scope.MCHCChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.MCHC);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.MCHC);
            $scope.CalculateTotalDC();
        }
    };
    //===================MCHC(End)=====================

    //===================PCT(Starts)==================
    //$scope.PCT = {};
    $scope.SetPCT = function () {
        if ($scope.PCTChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.PCT);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.PCT);
        }
    };
    //===================PCT(End)=====================

    //===================RDWSD(Starts)===================
    //$scope.RDWSD = {};
    $scope.SetRDWSD = function () {
        if ($scope.RDWSDChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.RDWSD);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.RDWSD);
        }
    };
    //===================RDWSD(End)======================

    //===================P-LCR(Starts)===================
    //$scope.PLCR = {};
    $scope.SetPLCR = function () {
        if ($scope.PLCRChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.PLCR);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.PLCR);
        }
    };
    //===================P-LCR(End)======================

    //===================IG(Starts)===================
    //$scope.IG = {};
    $scope.SetIG = function () {
        if ($scope.IGChecked == true) {
            var index = $scope.LisPatient.LisHematologys.indexOf($scope.IG);
            $scope.LisPatient.LisHematologys.splice(index, 1);
        }
        else {
            $scope.LisPatient.LisHematologys.push($scope.IG);
        }
    };
    //===================IG(End)======================


    // ===================CheckAll(Start)==============

    $scope.SetAllChecked = function () {
        if ($scope.AllChecked == true) {
            $scope.HGBChecked = true;
            $scope.Other01Checked = true;
            $scope.Other02Checked = true;
            $scope.Other03Checked = true;
            $scope.ESRChecked = true;
            $scope.WBCChecked = true;
            $scope.PLTChecked = true;
            $scope.RDWChecked = true;
            $scope.BTChecked = true;
            $scope.NEUChecked = true;
            $scope.RBCChecked = true;
            $scope.MPVChecked = true;
            $scope.CTChecked = true;
            $scope.LYMChecked = true;
            $scope.HCTChecked = true;
            $scope.PDWChecked = true;
            $scope.CEChecked = true;
            $scope.MONChecked = true;
            $scope.MCVChecked = true;
            $scope.MPChecked = true;
            $scope.ECChecked = true;
            $scope.EOSChecked = true;
            $scope.MCHChecked = true;
            $scope.MPCChecked = true;
            $scope.RCChecked = true;
            $scope.BASChecked = true;
            $scope.MCHCChecked = true;
            $scope.PCTChecked = true;
            $scope.RDWSDChecked = true;
            $scope.PLCRChecked = true;
            $scope.IGChecked = true;

            //$scope.SetHGB();
            //$scope.SetOther01();
            //$scope.SetOther02();
            //$scope.SetESR();
            //$scope.SetWBC();
            //$scope.SetPLT();
            //$scope.SetRDW();
            //$scope.SetBT();
            //$scope.SetNEU();
            //$scope.SetRBC();
            //$scope.SetMPV();
            //$scope.SetCT();
            //$scope.SetLYM();
            //$scope.SetHCT();
            //$scope.SetPDW();
            //$scope.SetCE();            
            //$scope.SetMON();
            //$scope.SetMCV();
            //$scope.SetMP();
            //$scope.SetEC();
            //$scope.SetEOS();
            //$scope.SetMCH();
            //$scope.SetMPC();
            //$scope.SetRC();
            //$scope.SetBAS();
            //$scope.SetMCHC();
            //$scope.SetPCT();
            //$scope.SetRDWSD();
            //$scope.SetPLCR();
            //$scope.SetIG();
        }
        else {
            $scope.HGB = {};
            $scope.Other01 = {};
            $scope.Other02 = {};
            $scope.Other03 = {};
            $scope.ESR = {};
            $scope.WBC = {};
            $scope.PLT = {};
            $scope.RDW = {};
            $scope.BT = {};
            $scope.NEU = {};
            $scope.RBC = {};
            $scope.MPV = {};
            $scope.CT = {};
            $scope.LYM = {};
            $scope.HCT = {};
            $scope.PDW = {};
            $scope.CE = {};
            $scope.MON = {};
            $scope.MCV = {};
            $scope.MP = {};
            $scope.EC = {};
            $scope.EOS = {};
            $scope.MCH = {};
            $scope.MPC = {};
            $scope.RC = {};
            $scope.BAS = {};
            $scope.MCHC = {};
            $scope.PCT = {};
            $scope.RDWSD = {};
            $scope.PLCR = {};
            $scope.IG = {};

            //$scope.LisPatient.LisHematologys.splice($scope.HGB, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.Other01, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.Other02, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.Other03, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.ESR, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.WBC, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.PLT, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.RDW, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.BT, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.NEU, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.RBC, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.MPV, 1);            
            //$scope.LisPatient.LisHematologys.splice($scope.CT, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.LYM, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.HCT, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.PDW, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.CE, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.MON, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.MCV, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.MP, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.EC, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.EOS, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.MCH, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.MPC, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.RC, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.BAS, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.MCHC, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.PCT, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.RDWSD, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.PLCR, 1);
            //$scope.LisPatient.LisHematologys.splice($scope.IG, 1);
        }
    };

    // ===================CheckAll(End)================


    $scope.CalculateNeuAbsoluteCount = function()
    {
        var wbc = parseFloat($scope.WBC.TestResult) || 0;
        var NEU = parseFloat($scope.NEU.TestResult) || 0;
        var result = (wbc * NEU) / 100;
        $scope.Neutrophil.TestResult = result.toFixed(2);
    }


    $scope.CalculateLymAbsoluteCount = function () {
        var wbc = parseFloat($scope.WBC.TestResult) || 0;
        var LYM = parseFloat($scope.LYM.TestResult) || 0;
        var result = (wbc * LYM) / 100;
        $scope.Lymphocyte.TestResult = result.toFixed(2);
    }

    $scope.CalculateMonAbsoluteCount = function () {
        var wbc = parseFloat($scope.WBC.TestResult) || 0;
        var MON = parseFloat($scope.MON.TestResult) || 0;
        var result = (wbc * MON) / 100;
        $scope.Monocyte.TestResult = result.toFixed(2);
    }

    $scope.CalculateEosAbsoluteCount = function () {
        var wbc = parseFloat($scope.WBC.TestResult) || 0;
        var EOS = parseFloat($scope.EOS.TestResult) || 0;
        var result = (wbc * EOS) / 100;
        $scope.Eosinophil.TestResult = result.toFixed(2);
    }

    $scope.CalculateBasAbsoluteCount = function () {
        var wbc = parseFloat($scope.WBC.TestResult) || 0;
        var BAS = parseFloat($scope.BAS.TestResult) || 0;
        var result = (wbc * BAS) / 100;
        $scope.Basophil.TestResult = result.toFixed(2);
    }


    // ==========CalculateTotalDC(Starts)==============

    $scope.CalculateTotalDC = function () {
        var totalQuantity = 0;

        var NEU = parseFloat($scope.NEU.TestResult) || 0;
        var LYM = parseFloat($scope.LYM.TestResult) || 0;
        var MON = parseFloat($scope.MON.TestResult) || 0;
        var EOS = parseFloat($scope.EOS.TestResult) || 0;
        var BAS = parseFloat($scope.BAS.TestResult) || 0;

        var Other01 = parseFloat($scope.Other01.TestResult) || 0;
        var Other02 = parseFloat($scope.Other02.TestResult) || 0;

        totalQuantity = NEU + LYM + MON + EOS + BAS + Other01 + Other02;
        $scope.LisPatient.TotalDc = Math.round(totalQuantity).toFixed(2);
    };

    // ==========CalculateTotalDC(Ends)==============

    // ==========RemoveButton(Starts)================

    $scope.Remove = function () {

        if ($scope.HGBChecked) {
            $scope.HGB.TestResult = null;
            $scope.HGBChecked = false;
        }
        if ($scope.ESRChecked) {
            $scope.ESR.TestResult = null;
            $scope.ESRChecked = false;
        }
        if ($scope.WBCChecked) {
            $scope.WBC.TestResult = null;
            $scope.WBCChecked = false;
        }
        if ($scope.NEUChecked) {
            $scope.NEU.TestResult = null;
            $scope.NEUChecked = false;
            $scope.CalculateTotalDC();
        }
        if ($scope.LYMChecked) {
            $scope.LYM.TestResult = null;
            $scope.LYMChecked = false;
            $scope.CalculateTotalDC();
        }
        if ($scope.MONChecked) {
            $scope.MON.TestResult = null;
            $scope.MONChecked = false;
            $scope.CalculateTotalDC();
        }
        //if ($scope.MONChecked) {
        //    $scope.MON.TestResult = null;
        //    $scope.MONChecked = false;
        //    $scope.CalculateTotalDC();
        //}
        if ($scope.EOSChecked) {
            $scope.EOS.TestResult = null;
            $scope.EOSChecked = false;
            $scope.CalculateTotalDC();
        }
        if ($scope.BASChecked) {
            $scope.BAS.TestResult = null;
            $scope.BASChecked = false;
            $scope.CalculateTotalDC();
        }

        if ($scope.CompanyName == "Prime Hospital Ltd." || $scope.CompanyName == "TMSS Medical College & Rafatullah Community Hospital") {
            if ($scope.NeutrophilChecked) {
                $scope.Neutrophil.TestResult = null;
                $scope.NeutrophilChecked = false;
            }
            if ($scope.LymphocyteChecked) {
                $scope.Lymphocyte.TestResult = null;
                $scope.LymphocyteChecked = false;
            }
            if ($scope.MonocyteChecked) {
                $scope.Monocyte.TestResult = null;
                $scope.MonocyteChecked = false;
            }
            if ($scope.EosinophilChecked) {
                $scope.Eosinophil.TestResult = null;
                $scope.EosinophilChecked = false;
            }
            if ($scope.BasophilChecked) {
                $scope.Basophil.TestResult = null;
                $scope.BasophilChecked = false;
            }
        }


        if ($scope.Other01Checked) {
            $scope.Other01.TestResult = null;
            $scope.Other01.OtherResult = null;
            $scope.Other01Checked = false;
            $scope.CalculateTotalDC();
        }
        if ($scope.Other02Checked) {
            $scope.Other02.TestResult = null;
            $scope.Other02.OtherResult = null;
            $scope.Other02Checked = false;
            $scope.CalculateTotalDC();
        }
        if ($scope.Other03Checked) {
            $scope.Other03.TestResult = null;
            $scope.Other03.OtherResult = null;
            $scope.Other03Checked = false;
        }
        if ($scope.PLTChecked) {
            $scope.PLT.TestResult = null;
            $scope.PLTChecked = false;
        }
        if ($scope.RBCChecked) {
            $scope.RBC.TestResult = null;
            $scope.RBCChecked = false;
        }
        if ($scope.HCTChecked) {
            $scope.HCT.TestResult = null;
            $scope.HCTChecked = false;
        }
        if ($scope.MCVChecked) {
            $scope.MCV.TestResult = null;
            $scope.MCVChecked = false;
        }
        if ($scope.MCHChecked) {
            $scope.MCH.TestResult = null;
            $scope.MCHChecked = false;
        }
        if ($scope.MCHCChecked) {
            $scope.MCHC.TestResult = null;
            $scope.MCHCChecked = false;
        }
        if ($scope.RDWChecked) {
            $scope.RDW.TestResult = null;
            $scope.RDWChecked = false;
        }
        if ($scope.MPVChecked) {
            $scope.MPV.TestResult = null;
            $scope.MPVChecked = false;
        }
        if ($scope.PDWChecked) {
            $scope.PDW.TestResult = null;
            $scope.PDWChecked = false;
        }
        if ($scope.MPChecked) {
            $scope.MP.TestResult = null;
            $scope.MPChecked = false;
        }
        if ($scope.MPCChecked) {
            $scope.MPC.TestResult = null;
            $scope.MPCChecked = false;
        }
        if ($scope.PCTChecked) {
            $scope.PCT.TestResult = null;
            $scope.PCTChecked = false;
        }
        if ($scope.BTChecked) {
            $scope.BT.TestResult = null;
            $scope.BTChecked = false;
            $scope.BTSecond.TestResult = null;
        }
        if ($scope.CTChecked) {
            $scope.CT.TestResult = null;
            $scope.CTChecked = false;
            $scope.CTSecond.TestResult = null;
        }
        if ($scope.CEChecked) {
            $scope.CE.TestResult = null;
            $scope.CEChecked = false;
        }
        if ($scope.ECChecked) {
            $scope.EC.TestResult = null;
            $scope.ECChecked = false;
        }
        if ($scope.RCChecked) {
            $scope.RC.TestResult = null;
            $scope.RCChecked = false;
        }
        if ($scope.WBCChecked) {
            $scope.WBC.TestResult = null;
            $scope.WBCChecked = false;
        }
        if ($scope.RDWSDChecked) {
            $scope.RDWSD.TestResult = null;
            $scope.RDWSDChecked = false;
        }
        if ($scope.PLCRChecked) {
            $scope.PLCR.TestResult = null;
            $scope.PLCRChecked = false;
        }
        if ($scope.IGChecked) {
            $scope.IG.TestResult = null;
            $scope.IGChecked = false;
        }

        //$scope.AllChecked = false;
        //$scope.SetAllChecked();
    }

    // ==========RemoveButton(Ends)==================

    //=======For Report Checked Function(Starts)=========
    $scope.TestParticularId_Array = [];
    $scope.CheckThisOne = function (item) {
        $scope.temp_TestParticularId_Array = {};
        var TestParticularId = item.TestParticularId;


        if (item.IsChecked == true) {
            $scope.Checkedids.push(item.ResultTableId);

            if (item.TestResult != "") {
                $scope.temp_TestParticularId_Array.TestParticularId = item.TestParticularId;
                $scope.TestParticularId_Array.push($scope.temp_TestParticularId_Array.TestParticularId);
            }

        }
        else {
            var index = $scope.Checkedids.findIndex(x => x === item.ResultTableId);
            if (index != -1) {
                $scope.Checkedids.splice(index, 1);
            }

            var index2 = $scope.TestParticularId_Array.findIndex(x => x === item.TestParticularId);
            if (index2 != -1) {
                $scope.TestParticularId_Array.splice(index2, 1);
            }
        }
    };

    $scope.TestParticularId_Array_Lab = [];
    $scope.CheckThisOneLab = function (item) {
        $scope.temp_TestParticularId_Array = {};
        var TestParticularId = item.TestParticularId;


        if (item.IsChecked == true) {
            $scope.Checkedids.push(item.ResultTableId);

            //  if (item.TestResult != "") {
            $scope.temp_TestParticularId_Array.TestParticularId = item.TestParticularId;
            $scope.TestParticularId_Array_Lab.push($scope.temp_TestParticularId_Array.TestParticularId);
            //  }

        }
        else {
            var index = $scope.Checkedids.findIndex(x => x === item.ResultTableId);
            if (index != -1) {
                $scope.Checkedids.splice(index, 1);
            }

            var index2 = $scope.TestParticularId_Array_Lab.findIndex(x => x === item.TestParticularId);
            if (index2 != -1) {
                $scope.TestParticularId_Array_Lab.splice(index2, 1);
            }
        }
    };

    //for serology
    $scope.TestParticularId_Array_Serology = [];
    $scope.CheckThisOne__Serology = function (item) {
        $scope.temp_TestParticularId_Array = {};
        var TestParticularId = item.TestParticularId;


        if (item.IsChecked == true) {
            $scope.Checkedids.push(item.ResultTableId);

            if (item.SerologyResult) {
                $scope.temp_TestParticularId_Array.TestParticularId = item.TestParticularId;
                $scope.TestParticularId_Array_Serology.push($scope.temp_TestParticularId_Array.TestParticularId);
            }

        }
        else {
            var index = $scope.Checkedids.findIndex(x => x === item.ResultTableId);
            if (index != -1) {
                $scope.Checkedids.splice(index, 1);
            }

            var index2 = $scope.TestParticularId_Array_Serology.findIndex(x => x === item.TestParticularId);
            if (index2 != -1) {
                $scope.TestParticularId_Array_Serology.splice(index2, 1);
            }
        }
    };

    //for immunology

    $scope.TestParticularId_Array_Immunology = [];
    $scope.CheckThisOne__Immunology = function (item) {
        $scope.temp_TestParticularId_Array = {};
        var TestParticularId = item.TestParticularId;


        if (item.IsChecked == true) {
            $scope.Checkedids.push(item.ResultTableId);

            if (item.HormoneResult != "") {
                $scope.temp_TestParticularId_Array.TestParticularId = item.TestParticularId;
                $scope.TestParticularId_Array_Immunology.push($scope.temp_TestParticularId_Array.TestParticularId);
            }

        }
        else {
            var index = $scope.Checkedids.findIndex(x => x === item.ResultTableId);
            if (index != -1) {
                $scope.Checkedids.splice(index, 1);
            }

            var index2 = $scope.TestParticularId_Array_Immunology.findIndex(x => x === item.TestParticularId);
            if (index2 != -1) {
                $scope.TestParticularId_Array_Immunology.splice(index2, 1);
            }
        }
    };

    //=======For Report Checked Function(Ends)=========

    //For Specimen Parts.
    $scope.Specimens = [];
    $scope.GetAllSpecimen = function () {
        $http({
            method: "GET",
            url: "GetAllSpecimen"
        }).success(function (response) {
            $scope.Specimens = response;
        }).error(function (response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };
    $scope.GetAllSpecimen();

    // For Pathologist Id Part...!
    $scope.Consultants = [];
    $scope.GetAllConsultant = function () {
        $http({
            method: "GET",
            url: "GetAllConsultant"
        }).success(function (response) {
            $scope.Consultants = response;

            if ($scope.CompanyName == "ZamZam Hospital Limited") {

                $scope.defaultLabTechnician = $scope.Consultants.filter(function (item) {
                    return item.IsDefault === true;
                })[0];
               
            }
            else
            {
                $scope.restoreLastStoredPathologist();
            }
        }).error(function (response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };
    $scope.GetAllConsultant();

    $scope.OnSelectConsultant = function (val) {
        debugger;
        $scope.BioChemicalPathologistId = val.Id;
        $scope.BioChemicalPathologistSearch = $scope.BioChemicalPathologistId;
        $scope.Checkedids.push($scope.TestOrdId); // top
        $scope.Checkedids.push($scope.BioConsultantt); // top 
        $.cookie("lastBioChemicalTechnician", JSON.stringify(val), { expires: 365 });

        if ($scope.BioChemicalPathologistId == $scope.BioChemicalPathologistSearchtwo) {
            //$scope.BioChemicalPathologist = undefined;
            //$scope.BioChemicalPathologistId = undefined;
            $scope.LisPatient.LisHematologys.PathologistId = 0;
            //$scope.BioChemicalPathologistSearch = undefined;
        }
        if ($scope.BioChemicalPathologistId == $scope.BioChemicalPathologistSearchthree) {
            //$scope.BioChemicalPathologist = undefined;
            //$scope.BioChemicalPathologistId = undefined;
            $scope.LisPatient.LisHematologys.PathologistId = 0;
            //$scope.BioChemicalPathologistSearch = undefined;
        }
    };
    $scope.OnChangeBioConsultant = function (val) {
        debugger;
        $scope.BioChemicalPathologistId = null;
        $scope.BioChemicalPathologistSearch = $scope.BioChemicalPathologistId;
    };

    $scope.OnSelectConsultanttwo = function (val) {
        debugger;
        $scope.BioChemicalPathologistSearchtwo = val.Id;
        $scope.BioChemicalPathologisttwo = val;

        if ($scope.BioChemicalPathologistId == $scope.BioChemicalPathologistSearchtwo)
        {            
                 //$scope.BioChemicalPathologistSearchtwo = undefined;
                 $scope.BioChemicalResults.PathologistId2 = 0;
                 //$scope.BioChemicalPathologisttwo = undefined;
        }
        
        if ($scope.BioChemicalPathologistSearchthree == $scope.BioChemicalPathologistSearchtwo) {
            //$scope.BioChemicalPathologistSearchtwo = undefined;
            $scope.BioChemicalResults.PathologistId2 = 0;
            //$scope.BioChemicalPathologisttwo = undefined;
        }
    };
    $scope.OnChangeBioConsultantTwo = function (val) {
        debugger;
        $scope.BioChemicalPathologistSearchtwo = val;
        $scope.BioChemicalPathologisttwo = val;
    };
    $scope.OnSelectConsultantthree = function (val) {
        debugger;
        $scope.BioChemicalPathologistSearchthree = val.Id;
        $scope.BioChemicalPathologistthree = val;

        if ($scope.BioChemicalPathologistId == $scope.BioChemicalPathologistSearchthree)
        {
            //$scope.BioChemicalPathologistSearchthree = undefined;
            $scope.BioChemicalResults.PathologistId3 = 0;
            //$scope.BioChemicalPathologistthree = undefined;
        }

        if ($scope.BioChemicalPathologistSearchtwo == $scope.BioChemicalPathologistSearchthree) {
            //$scope.BioChemicalPathologistSearchthree = undefined;
            $scope.BioChemicalResults.PathologistId3 = 0;
            //$scope.BioChemicalPathologistthree = undefined;
        }
    };
    $scope.OnChangeBioConsultantThree = function (val) {
        debugger;
        $scope.BioChemicalPathologistSearchthree = val;
        $scope.BioChemicalPathologistthree = val;
    };
   

    $scope.OnSelectSrologyConsultant = function (val) {
        $scope.SeroConsultantt = val.Id;
        $scope.seroPathologistSearch = $scope.SeroConsultantt;
        $scope.Checkedids.push($scope.TestOrdId); // top
        $scope.Checkedids.push($scope.SeroConsultantt); // top 
        $.cookie("lastSerologyTechnician", JSON.stringify(val), { expires: 365 });

        if ($scope.SeroConsultantt == $scope.seroPathologistSearchtwo) {
            //$scope.seroPathologist = undefined;
            //$scope.SeroConsultantt = undefined;
            $scope.Serologys.PathologistId = 0;
            //$scope.seroPathologistSearch = undefined;
        }
        if ($scope.SeroConsultantt == $scope.seroPathologistSearchthree) {
            //$scope.seroPathologist = undefined;
            //$scope.SeroConsultantt = undefined;
            $scope.Serologys.PathologistId = 0;
            //$scope.seroPathologistSearch = undefined;
        }
    };
    $scope.OnChangeSrologyConsultant = function (val) {
        $scope.SeroConsultantt = null;
        $scope.seroPathologistSearch = $scope.SeroConsultantt;
    }
    $scope.OnSelectSrologyConsultanttwo = function (val) {
        $scope.seroPathologistSearchtwo = val.Id;
        $scope.seroPathologisttwo = val;

        if ($scope.SeroConsultantt == $scope.seroPathologistSearchtwo) {
            //$scope.seroPathologistSearchtwo = undefined;
            $scope.Serologys.PathologistId2 = 0;
            //$scope.seroPathologisttwo = undefined;
        }

        if ($scope.seroPathologistSearchthree == $scope.seroPathologistSearchtwo) {
            //$scope.seroPathologistSearchtwo = undefined;
            $scope.Serologys.PathologistId2 = 0;
            //$scope.seroPathologisttwo = undefined;
        }

    };
    $scope.OnChangeSrologyConsultanttwo = function (val) {
        $scope.seroPathologistSearchtwo = val;
        $scope.seroPathologisttwo = val;
    }
    $scope.OnSelectSrologyConsultantthree = function (val) {
        $scope.seroPathologistSearchthree = val.Id;
        $scope.seroPathologistthree = val;

        if ($scope.SeroConsultantt == $scope.seroPathologistSearchthree) {
            //$scope.seroPathologistSearchthree = undefined;
            $scope.Serologys.PathologistId3 = 0;
            //$scope.seroPathologistthree = undefined;
        }

        if ($scope.seroPathologistSearchtwo == $scope.seroPathologistSearchthree) {
            //$scope.seroPathologistSearchthree = undefined;
            $scope.Serologys.PathologistId3 = 0;
            //$scope.seroPathologistthree = undefined;
        }
    };
    $scope.OnChangeSrologyConsultantthree = function (val) {
        $scope.seroPathologistSearchthree = val;
        $scope.seroPathologistthree = val;
    }
  

    //$scope.SetSeroPathologistFix = function () {
    //    $.cookie("lastSerologyTechnician", JSON.stringify(val), { expires: 365 });
    //}

    $scope.OnSelectImmunologyConsultant = function (val) {
        debugger;
        $scope.ImmunooConsultantt = val.Id;
        $scope.ImmunoPathologistSearch = $scope.ImmunooConsultantt;
        $scope.Checkedids.push($scope.TestOrdId); // top
        $scope.Checkedids.push($scope.ImmunooConsultantt); // top 
        $.cookie("lastImmunologyTechnician", JSON.stringify(val), { expires: 365 });

        if ($scope.ImmunooConsultantt == $scope.ImmunoPathologistSearchtwo) {
            $scope.ImmunoPathologist = undefined;
            $scope.ImmunooConsultantt = undefined;
            $scope.Hormones.PathologistId = 0;
            $scope.ImmunoPathologistSearch = undefined;
        }
        if ($scope.ImmunooConsultantt == $scope.ImmunoPathologistSearchthree) {
            $scope.ImmunoPathologist = undefined;
            $scope.ImmunooConsultantt = undefined;
            $scope.Hormones.PathologistId = 0;
            $scope.ImmunoPathologistSearch = undefined;
        }
    };
    $scope.OnChangeImmunologyConsultant = function (val) {
        debugger;
        $scope.ImmunooConsultantt = null;
        $scope.ImmunoPathologistSearch = $scope.ImmunooConsultantt;
    }

    $scope.OnSelectImmunologyConsultanttwo = function (val) {
        debugger;
        $scope.ImmunoPathologistSearchtwo = val.Id;
        $scope.ImmunoPathologisttwo = val;

        if ($scope.ImmunooConsultantt == $scope.ImmunoPathologistSearchtwo) {
            //$scope.ImmunoPathologistSearchtwo = undefined;
            $scope.Hormones.PathologistId2 = 0;
            //$scope.ImmunoPathologisttwo = undefined;
        }

        if ($scope.ImmunoPathologistSearchthree == $scope.ImmunoPathologistSearchtwo) {
            //$scope.ImmunoPathologistSearchtwo = undefined;
            $scope.Hormones.PathologistId2 = 0;
            //$scope.ImmunoPathologisttwo = undefined;
        }
    };
    $scope.OnChangeImmunologyConsultantTwo = function (val) {
        debugger;
        $scope.ImmunoPathologistSearchtwo = val;
        $scope.ImmunoPathologisttwo = val;
    };

    $scope.OnSelectImmunologyConsultantthree = function (val) {
        debugger;
        $scope.ImmunoPathologistSearchthree = val.Id;
        $scope.ImmunoPathologistthree = val;

        if ($scope.ImmunooConsultantt == $scope.ImmunoPathologistSearchthree) {
            //$scope.ImmunoPathologistSearchthree = undefined;
            $scope.Hormones.PathologistId3 = 0;
            //$scope.ImmunoPathologistthree = undefined;
        }

        if ($scope.ImmunoPathologistSearchtwo == $scope.ImmunoPathologistSearchthree) {
            //$scope.ImmunoPathologistSearchthree = undefined;
            $scope.Hormones.PathologistId3 = 0;
            //$scope.ImmunoPathologistthree = undefined;
        }
    };
    $scope.OnChangeImmunologyConsultantThree = function (val) {
        debugger;
        $scope.ImmunoPathologistSearchthree = val;
        $scope.ImmunoPathologistthree = val;
    };

    $scope.OnSelectImmunologyConsultant2 = function (val) {
        $scope.ImmunooConsultantt = val.Id;
        $scope.ImmunoPathologistSearch = $scope.ImmunooConsultantt;
        $scope.Checkedids.push($scope.TestOrdId); // top
        $scope.Checkedids.push($scope.ImmunooConsultantt); // top 

        $.cookie("lastImmunologyTechnician", JSON.stringify(val), { expires: 365 });
    }
    $scope.OnSelectLabConsultant = function (val) {
        $scope.LabConsultantt = val.Id;
        $scope.LabPathologistSearch = $scope.LabConsultantt;
        $scope.Checkedids.push($scope.LabConsultantt); // top 
        $scope.Checkedids.push($scope.TestOrdId); // top

        $.cookie("lastLabReportTechnician", JSON.stringify(val), { expires: 365 });

        if ($scope.LabConsultantt == $scope.LabPathologistSearchtwo) {
            //$scope.LabPathologist = undefined;
            //$scope.LabConsultantt = undefined;
            $scope.Hormones.PathologistId = 0;
            //$scope.LabPathologistSearch = undefined;
        }
        if ($scope.LabConsultantt == $scope.LabPathologistSearchthree) {
            //$scope.LabPathologist = undefined;
            //$scope.LabConsultantt = undefined;
            $scope.Hormones.PathologistId = 0;
            //$scope.LabPathologistSearch = undefined;
        }
    };
    $scope.OnChangeLabConsultant = function (val) {
        $scope.LabConsultantt = null;
        $scope.LabPathologistSearch = $scope.LabConsultantt;
    };

    $scope.OnSelectLabConsultanttwo = function (val) {
        debugger;
        $scope.LabPathologistSearchtwo = val.Id;
        $scope.LabPathologisttwo = val;

        if ($scope.LabConsultantt == $scope.LabPathologistSearchtwo) {
            //$scope.LabPathologistSearchtwo = undefined;            
            //$scope.LabPathologisttwo = undefined;
        }

        if ($scope.LabPathologistSearchthree == $scope.LabPathologistSearchtwo) {
            //$scope.LabPathologistSearchtwo = undefined;
            //$scope.LabPathologisttwo = undefined;
        }
    };
    $scope.OnChangeLabConsultanttwo = function (val) {
        debugger;
        $scope.LabPathologistSearchtwo = val;
        $scope.LabPathologisttwo = val;
    };

    $scope.OnSelectLabConsultantthree = function (val) {
        debugger;
        $scope.LabPathologistSearchthree = val.Id;
        $scope.LabPathologistthree = val;

        if ($scope.LabConsultantt == $scope.LabPathologistSearchthree) {
            //$scope.LabPathologistSearchthree = undefined;
            //$scope.LabPathologistthree = undefined;
        }

        if ($scope.LabPathologistSearchtwo == $scope.LabPathologistSearchthree) {
            //$scope.LabPathologistSearchthree = undefined;
            //$scope.LabPathologistthree = undefined;
        }
    };
    $scope.OnChangeLabConsultantthree = function (val) {
        debugger;
        $scope.LabPathologistSearchthree = val;
        $scope.LabPathologistthree = val;
    };

    $scope.OnSelectHematologyConsultant = function (val) {
        debugger;   
        $.cookie("lastHematologyTechnician", JSON.stringify(val), { expires: 365 });
        $scope.HematologyPathologistId = val.Id;
        $scope.HematoPathologistSearch = $scope.HematologyPathologistId;      

        $scope.Checkedids.push($scope.HematologyPathologistId); // top 
        $scope.Checkedids.push($scope.TestOrdId); // top

        if ($scope.HematologyPathologistId == $scope.HematoPathologistSearchtwo) {
            //$scope.HematoPathologist = undefined;
            //$scope.HematologyPathologistId = undefined;
            $scope.LisPatient.LisHematologys.PathologistId = 0;
            //$scope.HematoPathologistSearch = undefined;
        }
        if ($scope.HematologyPathologistId == $scope.HematoPathologistSearchthree) {
            //$scope.HematoPathologist = undefined;
            //$scope.HematologyPathologistId = undefined;
            $scope.LisPatient.LisHematologys.PathologistId = 0;
            //$scope.HematoPathologistSearch = undefined;
        }
    };

    $scope.OnChangeHematologyConsultant = function (val) {
        debugger;
        $scope.HematologyPathologistId = val;
        $scope.HematoPathologistSearch = val;
    };

    $scope.OnSelectHematologyConsultanttwo = function (val) {
        debugger;        
        $scope.HematoPathologistSearchtwo = val.Id;
        $scope.LisPatient.LisHematologys.PathologistId2 = val.Id;
        $scope.HematoPathologisttwo = val;

        if ($scope.HematologyPathologistId == $scope.HematoPathologistSearchtwo)
        {
            //$scope.HematoPathologistSearchtwo = undefined;
            $scope.LisPatient.LisHematologys.PathologistId2 = 0;
            //$scope.HematoPathologisttwo = undefined;
        }
        if ($scope.HematoPathologistSearchthree == $scope.HematoPathologistSearchtwo) {
            //$scope.HematoPathologistSearchtwo = undefined;
            $scope.LisPatient.LisHematologys.PathologistId2 = 0;
            //$scope.HematoPathologisttwo = undefined;
        }
    };
    $scope.OnChangeHematologyConsultantTwo = function (val) {
        debugger;
        $scope.HematoPathologisttwo = val;
        $scope.HematoPathologistSearchtwo = val;
    };

    $scope.OnSelectHematologyConsultantthree = function (val) {
        debugger;
        $scope.HematoPathologistSearchthree = val.Id;
        $scope.LisPatient.LisHematologys.PathologistId3 = val.Id;
        $scope.HematoPathologistthree = val;

        if ($scope.HematologyPathologistId == $scope.HematoPathologistSearchthree) {
            //$scope.HematoPathologistSearchthree = undefined;
            $scope.LisPatient.LisHematologys.PathologistId3 = 0;
            //$scope.HematoPathologistthree = undefined;
        }
        if ($scope.HematoPathologistSearchtwo == $scope.HematoPathologistSearchthree) {
            //$scope.HematoPathologistSearchthree = undefined;
            $scope.LisPatient.LisHematologys.PathologistId3 = 0;
            //$scope.HematoPathologistthree = undefined;
        }
    };
    $scope.OnChangeHematologyConsultantThree = function (val) {
        debugger;
        $scope.HematoPathologistSearchthree = val;
        $scope.HematoPathologistthree = val;
    };


    $scope.OnSelectMicroBiologyConsultant = function (val) {
        $scope.MicroBioConsultantt = val.Id;
        $scope.MicroBiologyPathologistSearch = $scope.MicroBioConsultantt;
        $scope.Checkedids.push($scope.MicroBioConsultantt); // top 
        $scope.Checkedids.push($scope.TestOrdId); // top

        $.cookie("lastMicroBilogyTechnician", JSON.stringify(val), { expires: 365 });

        if ($scope.MicroBioConsultantt == $scope.MicroBiologyPathologistSearchtwo) {
            //$scope.MicroBiologyPathologist = undefined;
            //$scope.MicroBioConsultantt = undefined;
            //$scope.MicroBiologyPathologistSearch = undefined;
        }
        if ($scope.MicroBioConsultantt == $scope.MicroBiologyPathologistSearchthree) {
            //$scope.MicroBiologyPathologist = undefined;
            //$scope.MicroBioConsultantt = undefined;
            //$scope.MicroBiologyPathologistSearch = undefined;
        }
    }
    $scope.OnChangeMicroBiologyConsultant = function (val) {
        $scope.MicroBioConsultantt = null;
        $scope.MicroBiologyPathologistSearch = $scope.MicroBioConsultantt;
    };

    $scope.OnSelectMicroBiologyConsultanttwo = function (val) {
        debugger;
        $scope.MicroBiologyPathologistSearchtwo = val.Id;
        $scope.MicroBiologyPathologisttwo = val;

        if ($scope.MicroBioConsultantt == $scope.MicroBiologyPathologistSearchtwo) {
            //$scope.MicroBiologyPathologistSearchtwo = undefined;
            //$scope.MicroBiologyPathologisttwo = undefined;
        }
        if ($scope.MicroBiologyPathologistSearchthree == $scope.MicroBiologyPathologistSearchtwo) {
            //$scope.MicroBiologyPathologistSearchtwo = undefined;
            //$scope.MicroBiologyPathologisttwo = undefined;
        }
    };
    $scope.OnChangeMicroBiologyConsultanttwo = function (val) {
        debugger;
        $scope.MicroBiologyPathologisttwo = val;
        $scope.MicroBiologyPathologistSearchtwo = val;
    };
    $scope.OnSelectMicroBiologyConsultantthree = function (val) {
        debugger;
        $scope.MicroBiologyPathologistSearchthree = val.Id;
        $scope.MicroBiologyPathologistthree = val;

        if ($scope.MicroBioConsultantt == $scope.MicroBiologyPathologistSearchthree) {
            //$scope.MicroBiologyPathologistSearchthree = undefined;
            //$scope.MicroBiologyPathologistthree = undefined;
        }
        if ($scope.MicroBiologyPathologistSearchtwo == $scope.MicroBiologyPathologistSearchthree) {
            //$scope.MicroBiologyPathologistSearchthree = undefined;
            //$scope.MicroBiologyPathologistthree = undefined;
        }
    };
    $scope.OnChangeMicroBiologyConsultantthree = function (val) {
        debugger;
        $scope.MicroBiologyPathologistthree = val;
        $scope.MicroBiologyPathologistSearchthree = val;
    };

    $scope.OnSelectUrinConsultant = function (val) {
        $scope.UrinConsultantt = val.Id;
        $scope.UrinPathologistSearch = $scope.UrinConsultantt;
        $scope.Checkedids.push($scope.UrinConsultantt); // top 
        $scope.Checkedids.push($scope.TestOrdId); // top

        $.cookie("lastUrineTechnician", JSON.stringify(val), { expires: 365 });

        if ($scope.UrinConsultantt == $scope.UrinPathologistSearchtwo) {
            //$scope.UrinPathologist = undefined;
            //$scope.UrinConsultantt = undefined;
            //$scope.UrinPathologistSearch = undefined;
        }
        if ($scope.UrinConsultantt == $scope.UrinPathologistSearchthree) {
            //$scope.UrinPathologist = undefined;
            //$scope.UrinConsultantt = undefined;
           // $scope.UrinPathologistSearch = undefined;
        }

    };
    $scope.OnChangeUrinConsultant = function (val) {
        $scope.UrinConsultantt = null;
        $scope.UrinPathologistSearch = $scope.UrinConsultantt;
    }

    $scope.OnSelectUrinConsultanttwo = function (val) {
        $scope.UrinPathologistSearchtwo = val.Id;
        $scope.UrinPathologisttwo = val;

        if ($scope.UrinConsultantt == $scope.UrinPathologistSearchtwo) {
            //$scope.UrinPathologistSearchtwo = undefined;
            //$scope.UrinPathologisttwo = undefined;
        }
        if ($scope.UrinPathologistSearchthree == $scope.UrinPathologistSearchtwo) {
            //$scope.UrinPathologistSearchtwo = undefined;
            //$scope.UrinPathologisttwo = undefined;
        }
    };
    $scope.OnChangeUrinConsultanttwo = function (val) {
        $scope.UrinPathologisttwo = null;
        $scope.UrinPathologistSearchtwo = val;
    }

    $scope.OnSelectUrinConsultantthree = function (val) {
        $scope.UrinPathologistSearchthree = val.Id;
        $scope.UrinPathologistthree = val;

        if ($scope.UrinConsultantt == $scope.UrinPathologistSearchthree) {
            //$scope.UrinPathologistSearchthree = undefined;
            //$scope.UrinPathologistthree = undefined;
        }
        if ($scope.UrinPathologistSearchtwo == $scope.UrinPathologistSearchthree) {
            //$scope.UrinPathologistSearchthree = undefined;
            //$scope.UrinPathologistthree = undefined;
        }
    };
    $scope.OnChangeUrinConsultantthree = function (val) {
        $scope.UrinPathologistthree = null;
        $scope.UrinPathologistSearchthree = val;
    }

    $scope.OnSelectStoolConsultant = function (val) {
        $scope.StoolConsultantt = val.Id;
        $scope.StoolPathologistSearch = $scope.StoolConsultantt;
        $scope.Checkedids.push($scope.StoolConsultantt); // top 
        $scope.Checkedids.push($scope.TestOrdId); // top

        $.cookie("lastStoolTechnician", JSON.stringify(val), { expires: 365 });

        if ($scope.StoolConsultantt == $scope.StoolPathologistSearchtwo) {
            //$scope.StoolPathologist = undefined;
            //$scope.StoolConsultantt = undefined;
            //$scope.StoolPathologistSearch = undefined;
        }
        if ($scope.StoolConsultantt == $scope.StoolPathologistSearchthree) {
            //$scope.StoolPathologist = undefined;
            //$scope.StoolConsultantt = undefined;
            //$scope.StoolPathologistSearch = undefined;
        }
    }
    $scope.OnChangeStoolConsultant = function (val) {
        $scope.StoolConsultantt = null;
        $scope.StoolPathologistSearch = $scope.StoolConsultantt;
    }

    $scope.OnSelectStoolConsultanttwo = function (val) {
        $scope.StoolPathologistSearchtwo = val.Id;
        $scope.StoolPathologisttwo = val;

        if ($scope.StoolPathologistSearch == $scope.StoolPathologistSearchtwo) {
            //$scope.StoolPathologisttwo = undefined;
            //$scope.StoolPathologistSearchtwo = undefined;
        }
        if ($scope.StoolPathologistSearchthree == $scope.StoolPathologistSearchtwo) {
            //$scope.StoolPathologisttwo = undefined;
            //$scope.StoolPathologistSearchtwo = undefined;
        }
    };

    $scope.OnChangeStoolConsultanttwo = function (val) {
        $scope.StoolConsultantt = null;
        $scope.StoolPathologistSearchtwo = val;
    };

    $scope.OnSelectStoolConsultantthree = function (val) {
        $scope.StoolPathologistSearchthree = val.Id;
        $scope.StoolPathologistthree = val;

        if ($scope.StoolPathologistSearch == $scope.StoolPathologistSearchthree) {
            //$scope.StoolPathologistSearchthree = undefined;
            //$scope.StoolPathologistthree = undefined;
        }
        if ($scope.StoolPathologistSearchtwo == $scope.StoolPathologistSearchthree) {
            //$scope.StoolPathologistSearchthree = undefined;
            //$scope.StoolPathologistthree = undefined;
        }
    };

    $scope.OnChangeStoolConsultantthree = function (val) {
        $scope.StoolConsultantt = null;
        $scope.StoolPathologistSearchthree = val;
    };
    //$scope.BoiSpecimen = 1; // new added for Default value
    $scope.OnSelectBiochemicalSpecimen = function (val) {
        $scope.BoiSpecimen = val.Id;
        $scope.SpecimenName = val.Specimen;
    }

    $scope.SerologySpeciman = "";
    $scope.OnSelectSerologySpecimen = function (val) {
        $scope.SeroSpecimen = val.Id;
        $scope.SerologySpeciman = val.Specimen;
    }

    $scope.ImmunologySpeciman = "";
    $scope.OnSelectImmunologySpecimen = function (val) {
        $scope.ImmuSpecimen = val.Id;
        $scope.ImmunologySpeciman = val.Specimen;
    }

    $scope.MicrobiologySpeciman = "";
    $scope.OnSelectMicroBiologySpecimen = function (val) {
        $scope.MicroBioSpecimen = val.Id;
        $scope.MicrobiologySpeciman = val.Specimen;
    }

    //$scope.ClearTestOrdId = function(){
    //    $scope.TestOrdId = "";
    //}
    $scope.testorderInvalid = true;
    $scope.ClearBackgroundColor = function (code) {
        $scope.testorderInvalid = true;
        $scope.TestParticularId_Array = [];
        $scope.TestParticularId_Array_Serology = [];
        $scope.TestParticularId_Array_Immunology = [];

        if (code != 13) {
            $('#TestOrdId_css').css('background-color', '#ed9e90');
        }


    }

    $scope.clearMicrobiologyResultFields = function () {
        $scope.MicroBios = [];
        $scope.RemoveDdlModelData();
        $scope.Interpritations = [];
        $scope.MicroBoiDetail = "";
        $scope.Diameter30 = "";
        $scope.InterpritationDetail = "";
        //$scope.TestId = 0;
        
        $scope.Organism = null;
        $scope.OrganismA = null;
        $scope.OrganismB = null;
        $scope.OrganismC = null;
        $scope.GrowthType = null;
        $scope.Colony = null;
        $scope.Incubation = null;
        $scope.BloodCs = null;
        $scope.Culture = {};

        var dynamic_InterpritationDetail = "InterpritationDetail";
        var dynamic_InterpritationDetail_b = "InterpritationDetail_b";
        var dynamic_InterpritationDetail_c = "InterpritationDetail_c";
        $scope[dynamic_InterpritationDetail] = "";
        $scope[dynamic_InterpritationDetail_b] = "";
        $scope[dynamic_InterpritationDetail_c] = "";
        for (var i = 1; i <= 29; i++) {
            var dynamic_MicroBoiDetail = "MicroBoiDetail" + i;
            var dynamic_Diameter = "Diameter" + i;
            dynamic_InterpritationDetail = "InterpritationDetail" + i;
            dynamic_InterpritationDetail_b = "InterpritationDetail" + i + "_b";
            dynamic_InterpritationDetail_c = "InterpritationDetail" + i + "_c";
            $scope[dynamic_MicroBoiDetail] = "";
            $scope[dynamic_Diameter] = "";
            $scope[dynamic_InterpritationDetail] = "";
            $scope[dynamic_InterpritationDetail_b] = "";
            $scope[dynamic_InterpritationDetail_c] = "";
        }
    }
    $scope.OnSelectTestOrderId = function (val) {
        $scope.TestId = 0;
        $scope.TestName = "";
        $scope.clearMicrobiologyResultFields();
        $scope.testorderInvalid = false;
        $scope.ShowHaematologyTab = false; // This is required for Tabs Shows and Hides
        $scope.ShowBioChemistryTab = false;
        $scope.ShowSerologyTab = false;        
        $scope.ShowImmunologyTab = false;
        $scope.ShowMicroBiologyTab = false;
        $scope.ShowUrineTab = false;
        $scope.ShowStoolTab = false;
        debugger;
        $scope.ShowLabReportTab = false;
        $scope.ShowHistoPathologyTab = false;
        $('#TestOrdId_css').css('background-color', '#ddd39f');

        var orderId = $scope.TestOrdId || null;
        if (orderId != null) {
            $scope.GetTestNamesByTestOrderId(orderId);
            $scope.GetMiscTestNamesByTestOrderId(orderId);
            $scope.printButtonDisable = false;
            $scope.saveButtonDisable = false;
        }

        $scope.Patient.TestOrdId = orderId;
        if (val != undefined) {
            $scope.GetTestNamesByTestOrderId(val.Id);
            $scope.Patient.TestOrdId = val.Id;
        }


        $scope.GetTestOrderById(); // for Patient info...!
        $scope.GetHematologyById(); // for Hematology...!
        $scope.GetBioChemById(); // for BioChemical...!
        $scope.GetSerologyById(); // for Serology...!
        $scope.GetHormoneById();  // for Hormone...!
        $scope.GetMicroBioById(); // for MicroBoilogy...!

        $scope.GetPBFReportById();

        ////==================================================== Zahid ============================================================
        $scope.GetUrinExamResultByTestOrderId(); //fast
        $scope.GetStoolExamResultByTestOrderId(); //fast
        $scope.GetLabResultById();
        //==================================================== Zahid End ========================================================
        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');      

        $scope.GetTestGroupsById(orderId); // for Tab Show & Hide
        
        $scope.IsCanceled = val.InvoiceStatus;
    };

    //for Show & Hide Tabs according to TestGroupId
    $scope.GetTestGroupsById = function (id) {
        $http({
            method: "POST",
            url: "/LIS/Haematology/GetTestGroupsById?id=" + id
        }).success(function (response) {
            debugger;
            if (response)
            {
                angular.forEach(response, function (groupId) {
                    if ($scope.CompanyName == "ZamZam Hospital Limited") {
                        if (groupId == 42) {
                            groupId = 4;
                            response.push(groupId);
                        }
                    }
                    switch (groupId) {
                        case 8:
                            $scope.ShowHaematologyTab = true;
                            $scope.topHeadValue = "";
                            break;
                        case 1:
                            $scope.ShowBioChemistryTab = true;
                            $scope.topHeadValue = "";
                            break;
                        case 35:
                            debugger;
                            $scope.ShowLabReportTab = true;
                            if ($scope.LabReportTopHeading != null) {
                                $scope.topHeadValue = $scope.LabReportTopHeading;
                            }
                            break;
                        case 9:
                            $scope.ShowSerologyTab = true;
                            $scope.topHeadValue = "";
                            break;
                        case 4:
                            $scope.ShowImmunologyTab = true;
                            $scope.topHeadValue = "";
                            break;
                        case 6:
                            $scope.ShowMicroBiologyTab = true;
                            $scope.topHeadValue = "";
                            break;
                        case 12:
                            $scope.ShowUrineTab = true;
                            $scope.topHeadValue = "";
                            break;
                        case 10:
                            $scope.ShowStoolTab = true;
                            $scope.topHeadValue = "";
                            break;
                        case 5:
                            $scope.ShowHistoPathologyTab = true;
                            $scope.topHeadValue = "";
                            break;
                    };
                });

                //activate the first tab according to displayed order
                if (response.includes(8)) {
                    $('.nav.nav-tabs.nav-tabs-inverse a[href="#default-tab-1"]').tab('show');
                    $scope.activeTab = "Haematology";
                }
                else if (response.includes(1)) {
                    $('.nav.nav-tabs.nav-tabs-inverse a[href="#default-tab-2"]').tab('show');
                    //$('.nav.nav-tabs.nav-tabs-inverse a[href="#default-tab-7"]').tab('show');
                    $scope.activeTab = "BioChemistry";
                }
                else if (response.includes(9)) {
                    $('.nav.nav-tabs.nav-tabs-inverse a[href="#default-tab-3"]').tab('show');
                    $scope.activeTab = "Serology";
                }
                else if (response.includes(4)) {
                    $('.nav.nav-tabs.nav-tabs-inverse a[href="#default-tab-4"]').tab('show');
                    $scope.activeTab = "Immunology";
                }
                else if (response.includes(12)) {
                    $('.nav.nav-tabs.nav-tabs-inverse a[href="#default-tab-5"]').tab('show');
                    $scope.activeTab = "Urine";
                }
                else if (response.includes(10)) {
                    $('.nav.nav-tabs.nav-tabs-inverse a[href="#default-tab-6"]').tab('show');
                    $scope.activeTab = "Stool";
                }
                else if (response.includes(6)) {
                    $('.nav.nav-tabs.nav-tabs-inverse a[href="#default-tab-9"]').tab('show');
                    $scope.activeTab = "Microbiology";
                }
                else if (response.includes(35)) {
                    $('.nav.nav-tabs.nav-tabs-inverse a[href="#default-tab-7"]').tab('show');
                    $scope.activeTab = "LabReport";
                }
                else if (response.includes(5)) {
                    $('.nav.nav-tabs.nav-tabs-inverse a[href="#default-tab-12"]').tab('show');
                    $scope.activeTab = "HistoPathology";
                }
            }
        }).error(function (response) {
        });
    }

    //ForShowing All Tabs On Pageload...
    $scope.EmptyTabValue = function () {
        $scope.ShowHaematologyTab = true;
        debugger;
        $scope.ShowLabReportTab = true;
        $scope.ShowStoolTab = true;
        $scope.ShowUrineTab = true;
        $scope.ShowMicroBiologyTab = true;
        $scope.ShowImmunologyTab = true;
        $scope.ShowSerologyTab = true;
        $scope.ShowBioChemistryTab = true;
        $scope.ShowHistoPathologyTab = true;
    };
    $scope.EmptyTabValue();

    // For Micobio TestPerticular(Starts) 
    $scope.OnSelectMicoBio = function (val) {

        //var index = $scope.MicroBios.indexOf(val.Name); // for removing double same(0) matchingIdentity Array Index .
        //$scope.MicroBios.splice(index, 1);
        
        //$scope.existingMicoBioAntibiotics = null;
        //$scope.existingMicoBioAntibiotics = $scope.MicroBios.filter(function (item) {
        //    return item.TestParticular === val.Name;
        //})[0];

        //if ($scope.existingMicoBioAntibiotics == null) {
        //    $scope.MicroBios.push({
        //        'TestParticular': val.Name,
        //        'MatchIdentity': 1
        //    });
        //    $('#microBioDdl1').css("background-color", "rgb(255 255 255)");
        //    $('#microBioDdl1').css("border", "1px solid gray");
        //}
        //else {
        //    $scope.MicroBoiDetail = null;
        //    $('#microBioDdl1').css("background-color", "rgb(255 222 221)");
        //    $('#microBioDdl1').css("border", "1px solid red");
        //}

        $scope.MicroBios.push({
            'TestParticular': val.Name,
            'MatchIdentity': 1
        });

        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
        //$scope.MicroBios.splice(index, 1);
    };

    $scope.OnSelectMicoBio1 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 1
                });
            }
            else {
                $scope.MicroBoiDetail1 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }      
        

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail1 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        //var chngingMicroBios = $scope.MicroBios[index];
        //$scope.MicroBios.splice(chngingMicroBios);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }

    };

    $scope.OnSelectMicoBio2 = function (val) {
        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 2
                });
            }
            else {
                $scope.MicroBoiDetail2 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }

       
        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail2 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio3 = function (val) {
        debugger;
        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 3
                });
            }
            else
            {
                $scope.MicroBoiDetail3 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail3 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio4 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 4
                });
            }
            else {
                $scope.MicroBoiDetail4 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }       

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail4 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio5 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 5
                });
            }
            else {
                $scope.MicroBoiDetail5 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail5 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio6 = function (val) {
        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 6
                });
            }
            else {
                $scope.MicroBoiDetail6 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }
       
        

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail6 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio7 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 7
                });
            }
            else {
                $scope.MicroBoiDetail7 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }

       

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail7 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio8 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 8
                });
            }
            else {
                $scope.MicroBoiDetail27 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }

        
        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail8 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio9 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 9
                });
            }
            else {
                $scope.MicroBoiDetail9 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }

       

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail9 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio10 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 10
                });
            }
            else {
                $scope.MicroBoiDetail10 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }

        

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail10 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio11 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 11
                });
            }
            else {
                $scope.MicroBoiDetail11 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }
       
       

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail11 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio12 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 12
                });
            }
            else {
                $scope.MicroBoiDetail12 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }       
        

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail12 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio13 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 13
                });
            }
            else {
                $scope.MicroBoiDetail13 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }

        
        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail13 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio14 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {

                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 14
                });
            }
            else {
                $scope.MicroBoiDetail14 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }


        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail14 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio15 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 15
                });
            }
            else {
                $scope.MicroBoiDetail15 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }

       

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail15 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio16 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 16
                });
            }
            else {
                $scope.MicroBoiDetail16 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }

        

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail16 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio17 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 17
                });
            }
            else {
                $scope.MicroBoiDetail17 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }       

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail17 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio18 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 18
                });
            }
            else {
                $scope.MicroBoiDetail18 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }

       
       

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail18 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio19 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 19
                });
            }
            else {
                $scope.MicroBoiDetail19 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }
        
       

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail19 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio20 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {

                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 20
                });
            }
            else {
                $scope.MicroBoiDetail20 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }


        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail20 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio21 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 21
                });
            }
            else {
                $scope.MicroBoiDetail21 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }       

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail21 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio22 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 22
                });

            }
            else {
                $scope.MicroBoiDetail22 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }
       

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail22 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio23 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 23
                });
            }
            else {
                $scope.MicroBoiDetail23 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }

       

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail23 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio24 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 24
                });

            }
            else {
                $scope.MicroBoiDetail24 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }

        
        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail24 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio25 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 25
                });
            }
            else {
                $scope.MicroBoiDetail25 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }

       

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail25 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio26 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 26
                });
            }
            else {
                $scope.MicroBoiDetail26 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }        

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail26 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio27 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 27
                });
            }
            else
            {
                $scope.MicroBoiDetail27 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }

        
        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail27 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio28 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 28
                });
            }
            else {
                $scope.MicroBoiDetail28 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }

        
       

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail28 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBio29 = function (val) {

        if ($scope.MicroBios != null) {
            $scope.existMicroBios = $scope.MicroBios.filter(function (item) {
                return item.TestParticular === val.Name;
            })[0];
            if ($scope.existMicroBios == null) {
                $scope.MicroBios.push({
                    'TestParticular': val.Name,
                    'MatchIdentity': 29
                });
            }
            else {
                $scope.MicroBoiDetail29 = null;
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Already Exist.' });
                return;
            }
        }
       
        

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngMicroBoiDetail29 = function (val) {
        var index = $scope.MicroBios.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.MicroBios.splice(index, 1);
        }
    };
    // For Micobio TestPerticular(Ends) 

    // For Micobio Interpritation(Starts) 
    $scope.OnSelectMicoBioInterpritation = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 0
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.Interpretation != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 0
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 0
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation1 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 1
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail1 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation1_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 1
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail1_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation1_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 1
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail1_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation2 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 2
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail2 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation2_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 2
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail2_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation2_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 2
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail2_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };




    $scope.OnSelectMicoBioInterpritation3 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 3
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail3 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation3_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 3
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail3_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation3_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 3
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail3_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation4 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 4
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail4 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation4_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 4
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail4_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation4_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 4
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail4_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };



    $scope.OnSelectMicoBioInterpritation5 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 5
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail5 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation5_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 5
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail5_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation5_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 5
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail5_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };




    $scope.OnSelectMicoBioInterpritation6 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 6
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail6 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation6_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 6
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail6_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation6_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 6
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail6_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation7 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 7
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail7 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };



    $scope.OnSelectMicoBioInterpritation7_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 7
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail7_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation7_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 7
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail7_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation8 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 8
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail8 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation8_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 8
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail8_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation8_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 8
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail8_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation9 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 9
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail9 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation9_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 9
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail9_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation9_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 9
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail9_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation10 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 10
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail10 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation10_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 10
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail10_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation10_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 10
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail10_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation11 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 11
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail11 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation11_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 11
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail11_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation11_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 11
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail11_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation12 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 12
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail12 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation12_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 12
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail12_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation12_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 12
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail12_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation13 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 13
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail13 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation13_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 13
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail13_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation13_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 13
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail13_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation14 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 14
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail14 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation14_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 14
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail14_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation14_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 14
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail14_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation15 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 15
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail15 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation15_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 15
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail15_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation15_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 15
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail15_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };



    $scope.OnSelectMicoBioInterpritation16 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 16
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail16 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation16_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 16
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail16_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation16_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 16
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail16_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation17 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 17
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail17 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation17_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 17
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail17_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation17_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 17
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail17_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation18 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 18
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail18 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation18_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 18
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail18_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation18_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 18
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail18_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };




    $scope.OnSelectMicoBioInterpritation19 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 19
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail19 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation19_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 19
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail19_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation19_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 19
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail19_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation20 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 20
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail20 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation20_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 20
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail20_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation20_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 20
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail20_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation21 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 21
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail21 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation21_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 21
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail21_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation21_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 21
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail21_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation22 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 22
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail22 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation22_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 22
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail22_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation22_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 22
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail22_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };



    $scope.OnSelectMicoBioInterpritation23 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 23
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail23 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation23_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 23
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail23_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation23_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 23
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail23_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation24 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 24
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail24 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation24_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 24
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail24_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation24_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 24
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail24_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };



    $scope.OnSelectMicoBioInterpritation25 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 25
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail25 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation25_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 25
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail25_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation25_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 25
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail25_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation26 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 26
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail26 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation26_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 26
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail26_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation26_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 26
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail26_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation27 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 27
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail27 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation27_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 27
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail27_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation27_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 27
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail27_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };



    $scope.OnSelectMicoBioInterpritation28 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 28
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail28 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };


    $scope.OnSelectMicoBioInterpritation28_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 28
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail28_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation28_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 28
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail28_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation29 = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'Interpretation': val.Text,
                'MatchIdentity': 29
            });
        }
        var field = document.getElementsByName('InterpritationDetailb_' + position);
        field[0].focus();
        //$scope.MicroBoi.TestParticular = val.Name;

        // For Removing Detail Validation...!
        var removeRed = $('.detailsValidation').removeClass('validation-error');
        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    };
    $scope.ChngInterpritationDetail29 = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    $scope.OnSelectMicoBioInterpritation29_b = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationB': val.Text,
                'MatchIdentity': 29
            });
        }
        var field = document.getElementsByName('InterpritationDetailc_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail29_b = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationB != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };
    $scope.OnSelectMicoBioInterpritation29_c = function (val) {
        if (val.Text == null || val.Text == "") {

        }
        else {
            $scope.Interpritations.push({
                'InterpretationC': val.Text,
                'MatchIdentity': 29
            });
        }
        var field = document.getElementsByName('MicroBoiDetail_' + position);
        field[0].focus();
    };
    $scope.ChngInterpritationDetail29_c = function (val) {
        var index = $scope.Interpritations.findIndex(x => x.MatchIdentity === val && x.InterpretationC != null);
        if (index != -1) {
            $scope.Interpritations.splice(index, 1);
        }
    };

    // For Micobio Interpritation(Ends) 

    // For Changing radio Button(Starts)

    $scope.ChangingMassage = function () {
        $scope.Organism = null;

        $scope.Culture.OrganismIsolated = null;
        var massageBm = "Massage For Bm";
        var massageBmc = "Massage For Bmc";
        //$scope.Culture.IsBm = parseInt($scope.Culture.IsBm) || 0;
        if ($scope.Culture.IsBm == "0") {
            $scope.Culture.MediaUsed = massageBm;
            //$scope.Culture.IsBm = true;
        }
        else {
            //$scope.Culture.IsBm = true;
            $scope.Culture.MediaUsed = massageBmc;
        }
    };


    $scope.ChangingMassage2 = function () {
        $scope.Organism = null;
        $scope.BloodCs = null;
        $scope.Culture.OrganismIsolated = null;
        var massageG = "Massage For Growth";
        var massageNG = "Massage For Non Growth";

        if ($scope.Culture.HasGrowth == "0") {
            $scope.Culture.CultureResult = massageG;
            $scope.microBioDdl = false; // for enable ddl when HasGrowth == "0"

            $scope.Culture.Incubation = null;
            $scope.Incubation = null;
            $scope.Culture.NonGrowthBloodCsMassage = null;
            $scope.GetAllMicoBoi();
        }
        else {
            //if ($scope.CompanyName == "Zia Heart Foundation Hospital & Research Institute") {
            //    $scope.BloodCs = "Culture Showed no growth after 48 hours incubation.";

            //}
            //else {
            //    $scope.BloodCs = "The initial blood culture report is negative but detection process will continue for another 3 days. If the culture becomes positive you will be informed over telephone from our end.";
            //}
            //$scope.BloodCs = "Culture Showed no growth after 48 hours incubation.";
            $scope.Culture.CultureResult = massageNG;
            $scope.microBioDdl = true; // for disable ddl when HasGrowth == "1"

            $scope.Culture.ColonyCount = null;
            $scope.Colony = null;

            $scope.MicroBios = [];
            $scope.Interpritations = [];
            $scope.RemoveDdlModelData();
        }
    };

    // For Changing radio Button(Ends)

    // For Removing DDL Modal(Starts)..

    $scope.RemoveDdlModelData = function () {
        $scope.MicroBoiDetail = "";
        $scope.MicroBoiDetail1 = "";
        $scope.MicroBoiDetail2 = "";
        $scope.MicroBoiDetail3 = "";
        $scope.MicroBoiDetail4 = "";
        $scope.MicroBoiDetail5 = "";
        $scope.MicroBoiDetail6 = "";
        $scope.MicroBoiDetail7 = "";
        $scope.MicroBoiDetail8 = "";
        $scope.MicroBoiDetail9 = "";
        $scope.MicroBoiDetail10 = "";
        $scope.MicroBoiDetail11 = "";
        $scope.MicroBoiDetail12 = "";
        $scope.MicroBoiDetail13 = "";
        $scope.MicroBoiDetail14 = "";
        $scope.MicroBoiDetail15 = "";
        $scope.MicroBoiDetail16 = "";
        $scope.MicroBoiDetail17 = "";
        $scope.MicroBoiDetail18 = "";
        $scope.MicroBoiDetail19 = "";
        $scope.MicroBoiDetail20 = "";
        $scope.MicroBoiDetail21 = "";
        $scope.MicroBoiDetail22 = "";
        $scope.MicroBoiDetail23 = "";
        $scope.MicroBoiDetail24 = "";
        $scope.MicroBoiDetail25 = "";
        $scope.MicroBoiDetail26 = "";
        $scope.MicroBoiDetail27 = "";
        $scope.MicroBoiDetail28 = "";
        $scope.MicroBoiDetail29 = "";


        $scope.Diameter1 = "";
        $scope.Diameter2 = "";
        $scope.Diameter3 = "";
        $scope.Diameter4 = "";
        $scope.Diameter5 = "";
        $scope.Diameter6 = "";
        $scope.Diameter7 = "";
        $scope.Diameter8 = "";
        $scope.Diameter9 = "";
        $scope.Diameter10 = "";
        $scope.Diameter11 = "";
        $scope.Diameter12 = "";
        $scope.Diameter13 = "";
        $scope.Diameter14 = "";
        $scope.Diameter15 = "";
        $scope.Diameter16 = "";
        $scope.Diameter17 = "";
        $scope.Diameter18 = "";
        $scope.Diameter19 = "";
        $scope.Diameter20 = "";
        $scope.Diameter21 = "";
        $scope.Diameter22 = "";
        $scope.Diameter23 = "";
        $scope.Diameter24 = "";
        $scope.Diameter25 = "";
        $scope.Diameter26 = "";
        $scope.Diameter27 = "";
        $scope.Diameter28 = "";
        $scope.Diameter29 = "";

        $scope.InterpritationDetail = "";
        $scope.InterpritationDetail1 = "";
        $scope.InterpritationDetail2 = "";
        $scope.InterpritationDetail3 = "";
        $scope.InterpritationDetail4 = "";
        $scope.InterpritationDetail5 = "";
        $scope.InterpritationDetail6 = "";
        $scope.InterpritationDetail7 = "";
        $scope.InterpritationDetail8 = "";
        $scope.InterpritationDetail9 = "";
        $scope.InterpritationDetail10 = "";
        $scope.InterpritationDetail11 = "";
        $scope.InterpritationDetail12 = "";
        $scope.InterpritationDetail13 = "";
        $scope.InterpritationDetail14 = "";
        $scope.InterpritationDetail15 = "";
        $scope.InterpritationDetail16 = "";
        $scope.InterpritationDetail17 = "";
        $scope.InterpritationDetail18 = "";
        $scope.InterpritationDetail19 = "";
        $scope.InterpritationDetail20 = "";
        $scope.InterpritationDetail21 = "";
        $scope.InterpritationDetail22 = "";
        $scope.InterpritationDetail23 = "";
        $scope.InterpritationDetail24 = "";
        $scope.InterpritationDetail25 = "";
        $scope.InterpritationDetail26 = "";
        $scope.InterpritationDetail27 = "";
        $scope.InterpritationDetail28 = "";
        $scope.InterpritationDetail29 = "";

        $scope.InterpritationDetail_b = "";
        $scope.InterpritationDetail1_b = "";
        $scope.InterpritationDetail2_b = "";
        $scope.InterpritationDetail3_b = "";
        $scope.InterpritationDetail4_b = "";
        $scope.InterpritationDetail5_b = "";
        $scope.InterpritationDetail6_b = "";
        $scope.InterpritationDetail7_b = "";
        $scope.InterpritationDetail8_b = "";
        $scope.InterpritationDetail9_b = "";
        $scope.InterpritationDetail10_b = "";
        $scope.InterpritationDetail11_b = "";
        $scope.InterpritationDetail12_b = "";
        $scope.InterpritationDetail13_b = "";
        $scope.InterpritationDetail14_b = "";
        $scope.InterpritationDetail15_b = "";
        $scope.InterpritationDetail16_b = "";
        $scope.InterpritationDetail17_b = "";
        $scope.InterpritationDetail18_b = "";
        $scope.InterpritationDetail19_b = "";
        $scope.InterpritationDetail20_b = "";
        $scope.InterpritationDetail21_b = "";
        $scope.InterpritationDetail22_b = "";
        $scope.InterpritationDetail23_b = "";
        $scope.InterpritationDetail24_b = "";
        $scope.InterpritationDetail25_b = "";
        $scope.InterpritationDetail26_b = "";
        $scope.InterpritationDetail27_b = "";
        $scope.InterpritationDetail28_b = "";
        $scope.InterpritationDetail29_b = "";

        $scope.InterpritationDetail_c = "";
        $scope.InterpritationDetail1_c = "";
        $scope.InterpritationDetail2_c = "";
        $scope.InterpritationDetail3_c = "";
        $scope.InterpritationDetail4_c = "";
        $scope.InterpritationDetail5_c = "";
        $scope.InterpritationDetail6_c = "";
        $scope.InterpritationDetail7_c = "";
        $scope.InterpritationDetail8_c = "";
        $scope.InterpritationDetail9_c = "";
        $scope.InterpritationDetail10_c = "";
        $scope.InterpritationDetail11_c = "";
        $scope.InterpritationDetail12_c = "";
        $scope.InterpritationDetail13_c = "";
        $scope.InterpritationDetail14_c = "";
        $scope.InterpritationDetail15_c = "";
        $scope.InterpritationDetail16_c = "";
        $scope.InterpritationDetail17_c = "";
        $scope.InterpritationDetail18_c = "";
        $scope.InterpritationDetail19_c = "";
        $scope.InterpritationDetail20_c = "";
        $scope.InterpritationDetail21_c = "";
        $scope.InterpritationDetail22_c = "";
        $scope.InterpritationDetail23_c = "";
        $scope.InterpritationDetail24_c = "";
        $scope.InterpritationDetail25_c = "";
        $scope.InterpritationDetail26_c = "";
        $scope.InterpritationDetail27_c = "";
        $scope.InterpritationDetail28_c = "";
        $scope.InterpritationDetail29_c = "";
    };

    // For Removing DDL Modal(End)..

    // For MicroBiology Dropdown data load
    $scope.GetAllMicoBoi = function () {

        $http({
            method: "POST",
            url: "GetAllMicoBoi",
        }).success(function mysucces(response) {
            $scope.MicoBoilogys = response;
            // document.getElementById('microBioDdl30').value = 'new value';
            var sl = 0;
            angular.forEach($scope.MicoBoilogys, function (val, key) {
                if (val.DefaultChronology != null) {

                    //if ($scope.results.indexOf(item) === -1) {
                    //  $scope.results.push(item);
                    if (sl == 0) {
                        $scope["MicroBoiDetail"] = val.Name;
                    }
                    else {
                        $scope["MicroBoiDetail" + sl] = val.Name;
                    }

                    $scope.MicroBios.push({
                        'TestParticular': val.Name,
                        'MatchIdentity': sl
                    });
                    sl++;
                    // }
                }
            });





        }).error(function myError(response) {

        });
    };
    $scope.GetAllMicoBoi();

    // For HardCode Dropdown(Starts).
    $scope.typeOfInterpritations = [];
    $scope.TypeOfInterpritationData = function () {
        $scope.typeOfInterpritations = [
            { Id: "", Text: "" },
            { Id: "1", Text: "S" },
            { Id: "2", Text: "R" },
            { Id: "3", Text: "I" },
            { Id: "3", Text: "M" }

        ]
    };
    $scope.TypeOfInterpritationData();

    //=============================================
    $scope.OnSelectOrganism = function (val) {
        $scope.Culture.OrganismIsolated = val.Text;
    };

    $scope.organismIsolatedDropdown = [];
    $scope.TypeOforganismIsolated = function () {
        //$scope.organismIsolatedDropdown = [
        //    //{ Id: "", Text: "Select" },
        //    { Id: "1", Text: "Escherichia Coli" },
        //    { Id: "2", Text: "Acinatobacter" },
        //    { Id: "3", Text: "Klebsiella" },
        //    { Id: "4", Text: "Pseudomonas" },            
        //    { Id: "11", Text: "Salmonella" },
        //    { Id: "12", Text: "Coagulase Negative Staphylococcus" },
        //    { Id: "13", Text: "Enterococcus" },
        //    { Id: "14", Text: "Non Hemolytic Streptococcus" },
        //    { Id: "15", Text: "Proteus" },           
        //    { Id: "5", Text: "No growth" },
        //    { Id: "6", Text: "Normal Flora" },
        //    { Id: "7", Text: "No Bacterial pathogen is isolated" },
        //    { Id: "8", Text: "No Entric pathogen is isolated" },
        //    { Id: "9", Text: "Staph" },
        //    { Id: "10", Text: "" },   // new added for getting null value
        //]
    };
    $scope.TypeOforganismIsolated();

    $scope.OrganismIsolatedDropdownData = function () {
        $http({
            method: 'GET',
            url: '/LIS/Haematology/OrganismIsolatedDropdownData',
            dataType: 'json'

        }).success(function (response) {
            $scope.organismIsolatedDropdown = response;
        });
    };
    $scope.OrganismIsolatedDropdownData();

    $scope.GrowthTypeDropdown = [];
    $scope.GrowthTypeDropdownData = function () {
        $http({
            method: 'GET',
            url: '/LIS/Haematology/GrowthTypeDropdownData',
            dataType: 'json'

        }).success(function (response) {
            $scope.GrowthTypeDropdown = response;
        });
    };
    $scope.GrowthTypeDropdownData();

    $scope.PusCellsDropdown = [];
    $scope.PusCellsDropdownData = function () {
        $http({
            method: 'GET',
            url: '/LIS/Haematology/PusCellsDropdownData',
            dataType: 'json'

        }).success(function (response) {
            $scope.PusCellsDropdown = response;
        });
    };
    $scope.PusCellsDropdownData();


    $scope.SaveLisDropdownData = function (Caption, Particular) {
        $http({
            method: "POST",
            url: "/LIS/Haematology/SaveLisDropdownData",
            data: { Caption: Caption, Particular: Particular }

        }).success(function (response) {
            if (response == "Faild") {
                alert("This name is already exists.");
            }

        }).error(function (response) {
            //  $scope.alerts.push({ 'type': 'danger', 'msg': $scope.AppMessage.failure });
        });
    }
    $scope.OnSelectColony = function (val) {
        $scope.Culture.ColonyCount = val.Text;
    };

    $scope.colonyCountDropdown = [];
    $scope.TypeOfColonyCount = function () {
        $scope.colonyCountDropdown = [
            { Id: "", Text: "Select" },
            { Id: "10", Text: "8X10^5 CFU/ml" },
            { Id: "11", Text: "10X10^5 CFU/ml" },
            { Id: "12", Text: "12X10^5 CFU/ml" },
             { Id: "13", Text: "16X10^5 CFU/ml" },
            { Id: "1", Text: "10^0 CFU/ml" },
            { Id: "2", Text: "10^1 CFU/ml" },
            { Id: "3", Text: "10^2 CFU/ml" },
            { Id: "4", Text: "10^3 CFU/ml" },
            { Id: "5", Text: "10^4 CFU/ml" },
            { Id: "6", Text: "10^5 CFU/ml" },
            { Id: "7", Text: "10^6 CFU/ml" },
            { Id: "8", Text: "10^7 CFU/ml" },
            { Id: "9", Text: "" }, // new added for getting null value


        ]
    };
    $scope.TypeOfColonyCount();

    $scope.OnSelectIncubation = function (val) {
        $scope.Culture.Incubation = val.Text;
    };

    $scope.incubationDropdown = [];
    $scope.TypeOfIncubation = function () {
        $scope.incubationDropdown = [
            { Id: "", Text: "Select" },
            { Id: "1", Text: "24 hrs. aerobic incubation at 37 C" },
            { Id: "2", Text: "48 hrs. aerobic incubation at 37 C" },
            { Id: "3", Text: "72 hrs. aerobic incubation at 37 C" },

        ]
    };
    $scope.TypeOfIncubation();

    $scope.OnSelectNonGrowthBloodCsMassage = function (val) {
        $scope.Culture.NonGrowthBloodCsMassage = val.Text;
    };

 
 
    //$scope.TypeOfBloodCsMassage = function () {
    //    $scope.bloodCsMassageDropdown = [];
    //};
    //$scope.TypeOfBloodCsMassage();
	
	
    //================================================

    // For Typade Dropdown(End)

    //For Getting Patient Info(Starts)
    $scope.GetTestOrderById = function () {
        $http({
            method: "POST",
            url: "GetTestOrderById?id=" + ($scope.Patient.TestOrdId)

        }).success(function mySucces(response) {
            $scope.Patient = response;

            $scope.LisPatient.Remarks = response.NoteData.heamatologyRemarks;
            $scope.LisPatient.ImmunologyRemarks = response.NoteData.immunologyRemarks;
            $scope.LisPatient.BiochemicalRemarks = response.NoteData.biochemalRemarks;
            $scope.LisPatient.SerologyRemarks = response.NoteData.serologyRemarks;
            $scope.LisPatient.LabRemarks = response.NoteData.labRemarks;
            $scope.LisPatient.MicrobiologyRemarks = response.NoteData.microbiologyRemarks;

            $scope.TestOrderIdOrderedDate = response.OrderDate; // new added28052018
            //$scope.GetClientById();
            //$scope.CalculateTotalAmount();

        }).error(function myError(response) {
            //$scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });
        });
    }
    //For Getting Patient Info(End)

    $scope.ClearColonyCount = function () {
        $scope.Colony = null;
        $scope.Culture.ColonyCount = null;
    }
    $scope.ClearIncubation = function () {
        $scope.Incubation = null;
        $scope.Culture.Incubation = null;
    }


    //===========GetMicroBoilogyById(starts)=================

    $scope.GetMicroBioById = function () {
        debugger;
        $http({
            method: "POST",
            url: "GetMicroBioById",
            //url: "GetMicroBioById?id=" + ($scope.TestOrdId)
            data: {id : $scope.TestOrdId, TestId : $scope.TestId} 
        }).success(function mySucces(response) {
            debugger;

            //$scope.clearMicrobiologyResultFields();
           
            var specimenId = 5;
            //For Getting All Results For Microbiology From Response Array[](Starts)

            if (response.Success)
            {
                debugger;
                if (response.microBoilogy.length > 0) {
                    $scope.TestName = response.microBoilogy[0].TestName;
                    $scope.TestId = response.microBoilogy[0].TestId;
                }
                if (response.microBoilogy.length > 0 && response.microBoilogy[0].Specimen) {
                    specimenId = response.microBoilogy[0].Specimen;
                }
                if (response.microBoilogy.length > 0) {
                    if (response.microBoilogy[0].AnalyzerId > 0) {
                        $scope.MicrobiologyAnalyzerId = response.microBoilogy[0].AnalyzerId;
                        $scope.MicrobiologyAnalyzer = $scope.MicrobiologyAnalyzers.filter(x => x.Id == $scope.MicrobiologyAnalyzerId)[0].AnalyzerName;

                    }
                }
                
                else {
                    $scope.MicrobiologyAnalyzerId = response.MicrobiologyAnalyzerId[0];
                    $scope.MicrobiologyAnalyzer = response.MicrobiologyAnalyzerName;

                }
                if (response.microBoilogy.length > 0) {
                    $scope.MicrobiologySpecimenNote = response.microBoilogy[0].SpecimenNote;
                }

                ///
                if (response.microBoilogy.length > 0) {
                    if (response.microBoilogy[0].CheckedBySignId > 0) {
                        $scope.MicrobiologyCheckedBySignId = response.microBoilogy[0].CheckedBySignId;
                        $scope.MicrobiologyCheckedBy = $scope.CheckedByList.filter(x => x.Id == $scope.MicrobiologyCheckedBySignId)[0];

                    }
                    else {
                        $scope.MicrobiologyCheckedBySignId = null;
                    }
                }

                ///
                if (response.microBoilogy.length > 0) {
                    if (response.microBoilogy[0].MedicalTechologistSignId > 0) {
                        $scope.MicrobiologyMedicalTechologistSignId = response.microBoilogy[0].MedicalTechologistSignId;
                        $scope.MicrobiologyMedicalTechologistBy = $scope.MedicalTechologistList.filter(x => x.Id == $scope.MicrobiologyMedicalTechologistSignId)[0];

                    }
                    else {
                        $scope.MicrobiologyMedicalTechologistSignId = null;
                    }
                }
            }
           
            //$scope.MicroBioSpecimen = specimenId;
            var selectedSpecimen = $filter('filter')($scope.Specimens, { Id: specimenId })[0];
            $scope.MicroBiologySpeciment = selectedSpecimen;

            $scope.OnSelectMicroBiologySpecimen(selectedSpecimen);
            debugger;
            if (response.pathologistId.length > 0) {
                $scope.MicroBiologyPathologist = {
                    "ConsultantName": response.pathologistId[0].ConsultantName,
                    "Id": response.pathologistId[0].PathologistId
                };
                
                //$scope.MicroBiologyPathologist.ConsultantName = response.pathologistId[0].ConsultantName;
                //$scope.MicroBiologyPathologist.Id = response.pathologistId[0].PathologistId;
                $scope.MicroBioConsultantt = response.pathologistId[0].PathologistId;
                $scope.MicroBiologyPathologistSearch = $scope.MicroBioConsultantt;
            }
            if (response.pathologistId2.length > 0) {                
                $scope.MicroBiologyPathologistSearchtwo = response.pathologistId2[0].PathologistId2;
                $scope.MicroBiologyPathologisttwo = $scope.Consultants.filter(x => x.Id == $scope.MicroBiologyPathologistSearchtwo)[0];
            }
            if (response.pathologistId3.length > 0) {
                $scope.MicroBiologyPathologistSearchthree = response.pathologistId3[0].PathologistId3;
                $scope.MicroBiologyPathologistthree = $scope.Consultants.filter(x => x.Id == $scope.MicroBiologyPathologistSearchthree)[0];
            }
            else
            {
                if ($scope.CompanyName == "ZamZam Hospital Limited") {

                    $scope.MicroBiologyPathologist = $scope.defaultLabTechnician.ConsultantName;
                    $scope.MicroBioConsultantt = $scope.defaultLabTechnician.Id;
                    $scope.MicroBiologyPathologistSearch = $scope.defaultLabTechnician.Id;

                }
                else
                {
                    $scope.MicroBiologyPathologist = {
                        "ConsultantName": '',
                        "Id": 0
                    };

                    var lastMicroBilogyTechnician = $.cookie("lastMicroBilogyTechnician");
                    if (lastMicroBilogyTechnician != undefined) {
                        $scope.MicroBiologyPathologists = JSON.parse(lastMicroBilogyTechnician);
                        $scope.MicroBiologyPathologist = $scope.MicroBiologyPathologists.ConsultantName;
                        $scope.MicroBioConsultantt = $scope.MicroBiologyPathologists.Id;
                        $scope.MicroBiologyPathologistSearch = $scope.MicroBiologyPathologists.Id;
                    }

                    if ($scope.MicrobilolgyCheckbox == true) {
                        $scope.MicroBiologyPathologist = JSON.parse(lastMicroBilogyTechnician);
                    }
                }
            }
           


            angular.forEach(response.microBoilogy, function (item) {
                $scope.LisPatient.pdt = item.RpDate; // For Getting 'MR Date' in Report...!

                $scope.MicroBiologyPrintStatus = item.PrintStatus; // For Getting 'PrintStatus'...!


                //$scope.MicroBiologyPathologist = response.pathologistId[0].ConsultantName;
                //$scope.MicroBioConsultantt = response.pathologistId[0].PathologistId;

                //======================Culture Result Part(Starts)======================================
                $scope.Culture.IsBm = item.IsBm;
                $scope.Culture.MediaUsed = item.MediaUsed;
                $scope.Culture.HasGrowth = item.HasGrowth;
                $scope.Culture.CultureResult = item.CultureResult;

                $scope.Culture.ColonyCount = item.ColonyCount;
                $scope.Colony = item.ColonyCount;

                $scope.Culture.Incubation = item.Incubation;
                $scope.Incubation = item.Incubation;

                $scope.Culture.NonGrowthBloodCsMassage = $scope.BloodCs;

                $scope.MediaUsedA = item.MediaUsedA != null ? true : false;
                $scope.MediaUsedB = item.MediaUsedB != null ? true : false;
                $scope.MediaUsedC = item.MediaUsedC != null ? true : false;
                $scope.MediaUsedD = item.MediaUsedD != null ? true : false;
                $scope.MediaUsedE = item.MediaUsedE != null ? true : false;

                // $scope.BloodCs = item.NonGrowthBloodCsMassage;
                //======================Culture Result Part(Ends)======================================

                var matchId = item.MatchIdentity;
                //var name = item.TestParticular;
                if (matchId == 0) {
                    $scope.MicroBoiDetail = item.TestParticular;
                    $scope.Diameter1 = item.InhibDiam; // new added for InHibDiameter

                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail,
                        'MatchIdentity': 0,
                        //'InhibDiam': $scope.Diameter1
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail,
                            'MatchIdentity': 0
                        });
                    }

                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail_b,
                            'MatchIdentity': 0
                        });
                    }

                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail_c,
                            'MatchIdentity': 0
                        });
                    }

                }
                else if (matchId == 1) {
                    $scope.MicroBoiDetail1 = item.TestParticular;
                    $scope.Diameter2 = item.InhibDiam; // new added for InHibDiameter

                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail1,
                        'MatchIdentity': 1,
                        //'InhibDiam': $scope.Diameter2
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail1 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail1,
                            'MatchIdentity': 1
                        });
                    }

                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail1_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail1_b,
                            'MatchIdentity': 1
                        });
                    }

                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail1_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail1_c,
                            'MatchIdentity': 1
                        });
                    }

                }
                else if (matchId == 2) {
                    $scope.MicroBoiDetail2 = item.TestParticular;
                    $scope.Diameter3 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail2,
                        'MatchIdentity': 2
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail2 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail2,
                            'MatchIdentity': 2
                        });
                    }

                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail2_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail2_b,
                            'MatchIdentity': 2
                        });
                    }

                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail2_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail2_c,
                            'MatchIdentity': 2
                        });
                    }
                }
                else if (matchId == 3) {
                    $scope.MicroBoiDetail3 = item.TestParticular;

                    $scope.Diameter4 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail3,
                        'MatchIdentity': 3
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail3 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail3,
                            'MatchIdentity': 3
                        });
                    }

                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail3_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail3_b,
                            'MatchIdentity': 3
                        });
                    }

                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail3_b = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail3_b,
                            'MatchIdentity': 3
                        });
                    }
                }
                else if (matchId == 4) {
                    $scope.MicroBoiDetail4 = item.TestParticular;

                    $scope.Diameter5 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail4,
                        'MatchIdentity': 4
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail4 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail4,
                            'MatchIdentity': 4
                        });
                    }

                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail4_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail4_b,
                            'MatchIdentity': 4
                        });
                    }

                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail4_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail4_c,
                            'MatchIdentity': 4
                        });
                    }
                }
                else if (matchId == 5) {
                    $scope.MicroBoiDetail5 = item.TestParticular;

                    $scope.Diameter6 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail5,
                        'MatchIdentity': 5
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail5 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail5,
                            'MatchIdentity': 5
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail5_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail5_b,
                            'MatchIdentity': 5
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail5_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail5_c,
                            'MatchIdentity': 5
                        });
                    }

                }
                else if (matchId == 6) {
                    $scope.MicroBoiDetail6 = item.TestParticular;

                    $scope.Diameter7 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail6,
                        'MatchIdentity': 6
                    });
                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail6 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail6,
                            'MatchIdentity': 6
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail6_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail6_b,
                            'MatchIdentity': 6
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail6_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail6_c,
                            'MatchIdentity': 6
                        });
                    }
                }
                else if (matchId == 7) {
                    $scope.MicroBoiDetail7 = item.TestParticular;

                    $scope.Diameter8 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail7,
                        'MatchIdentity': 7
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail7 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail7,
                            'MatchIdentity': 7
                        });
                    }

                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail7_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail7_b,
                            'MatchIdentity': 7
                        });
                    }

                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail7_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail7_c,
                            'MatchIdentity': 7
                        });
                    }

                }
                else if (matchId == 8) {
                    $scope.MicroBoiDetail8 = item.TestParticular;

                    $scope.Diameter9 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail8,
                        'MatchIdentity': 8
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail8 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail8,
                            'MatchIdentity': 8
                        });
                    }

                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail8_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail8_b,
                            'MatchIdentity': 8
                        });
                    }

                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail8_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail8_c,
                            'MatchIdentity': 8
                        });
                    }
                }
                else if (matchId == 9) {
                    $scope.MicroBoiDetail9 = item.TestParticular;

                    $scope.Diameter10 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail9,
                        'MatchIdentity': 9
                    });
                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail9 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail9,
                            'MatchIdentity': 9
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail9_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail9_b,
                            'MatchIdentity': 9
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail9_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail9_c,
                            'MatchIdentity': 9
                        });
                    }

                }
                else if (matchId == 10) {
                    $scope.MicroBoiDetail10 = item.TestParticular;

                    $scope.Diameter11 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail10,
                        'MatchIdentity': 10
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail10 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail10,
                            'MatchIdentity': 10
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail10_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail10_b,
                            'MatchIdentity': 10
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail10_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail10_c,
                            'MatchIdentity': 10
                        });
                    }
                }
                else if (matchId == 11) {
                    $scope.MicroBoiDetail11 = item.TestParticular;

                    $scope.Diameter12 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail11,
                        'MatchIdentity': 11
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail11 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail11,
                            'MatchIdentity': 11
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail11_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail11_b,
                            'MatchIdentity': 11
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail11_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail11_c,
                            'MatchIdentity': 11
                        });
                    }
                }
                else if (matchId == 12) {
                    $scope.MicroBoiDetail12 = item.TestParticular;

                    $scope.Diameter13 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail12,
                        'MatchIdentity': 12
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail12 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail12,
                            'MatchIdentity': 12
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail12_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail12_b,
                            'MatchIdentity': 12
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail12_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail12_c,
                            'MatchIdentity': 12
                        });
                    }
                }
                else if (matchId == 13) {
                    $scope.MicroBoiDetail13 = item.TestParticular;

                    $scope.Diameter14 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail13,
                        'MatchIdentity': 13
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail13 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail13,
                            'MatchIdentity': 13
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail13_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail13_b,
                            'MatchIdentity': 13
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail13_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail13_c,
                            'MatchIdentity': 13
                        });
                    }
                }
                else if (matchId == 14) {
                    $scope.MicroBoiDetail14 = item.TestParticular;

                    $scope.Diameter15 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail14,
                        'MatchIdentity': 14
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail14 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail14,
                            'MatchIdentity': 14
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail14_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail14_b,
                            'MatchIdentity': 14
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail14_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail14_c,
                            'MatchIdentity': 14
                        });
                    }
                }
                else if (matchId == 15) {
                    $scope.MicroBoiDetail15 = item.TestParticular;

                    $scope.Diameter16 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail15,
                        'MatchIdentity': 15
                    });
                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail15 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail15,
                            'MatchIdentity': 15
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail15_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail15_b,
                            'MatchIdentity': 15
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail15_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail15_c,
                            'MatchIdentity': 15
                        });
                    }
                }
                else if (matchId == 16) {
                    $scope.MicroBoiDetail16 = item.TestParticular;
                    $scope.Diameter17 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail16,
                        'MatchIdentity': 16
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail16 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail16,
                            'MatchIdentity': 16
                        });
                    }

                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail16_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail16_b,
                            'MatchIdentity': 16
                        });
                    }

                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail16_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail16_c,
                            'MatchIdentity': 16
                        });
                    }
                }
                else if (matchId == 17) {
                    $scope.MicroBoiDetail17 = item.TestParticular;
                    $scope.Diameter18 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail17,
                        'MatchIdentity': 17
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail17 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail17,
                            'MatchIdentity': 17
                        });
                    }

                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail17_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail17_b,
                            'MatchIdentity': 17
                        });
                    }

                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail17_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail17_c,
                            'MatchIdentity': 17
                        });
                    }
                }
                else if (matchId == 18) {
                    $scope.MicroBoiDetail18 = item.TestParticular;
                    $scope.Diameter19 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail18,
                        'MatchIdentity': 18
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail18 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail18,
                            'MatchIdentity': 18
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail18_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail18_b,
                            'MatchIdentity': 18
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail18_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail18_c,
                            'MatchIdentity': 18
                        });
                    }
                }
                else if (matchId == 19) {
                    $scope.MicroBoiDetail19 = item.TestParticular;
                    $scope.Diameter20 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail19,
                        'MatchIdentity': 19
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail19 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail19,
                            'MatchIdentity': 19
                        });
                    }

                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail19_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail19_b,
                            'MatchIdentity': 19
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail19_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail19_c,
                            'MatchIdentity': 19
                        });
                    }
                }
                else if (matchId == 20) {
                    $scope.MicroBoiDetail20 = item.TestParticular;
                    $scope.Diameter21 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail20,
                        'MatchIdentity': 20
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail20 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail20,
                            'MatchIdentity': 20
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail20_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail20_b,
                            'MatchIdentity': 20
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail20_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail20_c,
                            'MatchIdentity': 20
                        });
                    }

                }
                else if (matchId == 21) {
                    $scope.MicroBoiDetail21 = item.TestParticular;
                    $scope.Diameter22 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail21,
                        'MatchIdentity': 21
                    });

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail21 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail21,
                            'MatchIdentity': 21
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail21_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail21_b,
                            'MatchIdentity': 21
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail21_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail21_c,
                            'MatchIdentity': 21
                        });
                    }
                }
                else if (matchId == 22) {
                    $scope.MicroBoiDetail22 = item.TestParticular;
                    $scope.Diameter23 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail22,
                        'MatchIdentity': 22
                    });
                  
                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail22 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail22,
                            'MatchIdentity': 22
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail22_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail22_b,
                            'MatchIdentity': 22
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail22_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail22_c,
                            'MatchIdentity': 22
                        });
                    }
                }
                else if (matchId == 23) {
                    $scope.MicroBoiDetail23 = item.TestParticular;
                    $scope.Diameter24 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail23,
                        'MatchIdentity': 23
                    });
                  
                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail23 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail23,
                            'MatchIdentity': 23
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail23_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail23_b,
                            'MatchIdentity': 23
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail23_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail23_c,
                            'MatchIdentity': 23
                        });
                    }
                }
                else if (matchId == 24) {
                    $scope.MicroBoiDetail24 = item.TestParticular;
                    $scope.Diameter25 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail24,
                        'MatchIdentity': 24
                    });
                   
                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail24 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail24,
                            'MatchIdentity': 24
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail24_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail24_b,
                            'MatchIdentity': 24
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail24_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail24_c,
                            'MatchIdentity': 24
                        });
                    }
                }
                else if (matchId == 25) {
                    $scope.MicroBoiDetail25 = item.TestParticular;
                    $scope.Diameter26 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail25,
                        'MatchIdentity': 25
                    });
                   

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail25 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail25,
                            'MatchIdentity': 25
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail25_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail25_b,
                            'MatchIdentity': 25
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail25_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail25_c,
                            'MatchIdentity': 25
                        });
                    }
                }
                else if (matchId == 26) {
                    $scope.MicroBoiDetail26 = item.TestParticular;
                    $scope.Diameter27 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail26,
                        'MatchIdentity': 26
                    });
                   
                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail26 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail26,
                            'MatchIdentity': 26
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail26_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail26_b,
                            'MatchIdentity': 26
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail26_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail26_c,
                            'MatchIdentity': 26
                        });
                    }
                }
                else if (matchId == 27) {
                    $scope.MicroBoiDetail27 = item.TestParticular;
                    $scope.Diameter28 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail27,
                        'MatchIdentity': 27
                    });
                   
                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail27 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail27,
                            'MatchIdentity': 27
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail27_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail27_b,
                            'MatchIdentity': 27
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail27_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail27_c,
                            'MatchIdentity': 27
                        });
                    }
                }
                else if (matchId == 28) {
                    $scope.MicroBoiDetail28 = item.TestParticular;
                    $scope.Diameter29 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail28,
                        'MatchIdentity': 28
                    });
                    
                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail28 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail28,
                            'MatchIdentity': 28
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail28_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail28_b,
                            'MatchIdentity': 28
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail28_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail28_c,
                            'MatchIdentity': 28
                        });
                    }
                }
                else if (matchId == 29) {
                    $scope.MicroBoiDetail29 = item.TestParticular;

                    $scope.Diameter30 = item.InhibDiam; // new added for InHibDiameter
                    $scope.microBioDdl = false;
                    $scope.MicroBios.push({
                        'TestParticular': $scope.MicroBoiDetail29,
                        'MatchIdentity': 29
                    });
                   

                    if (item.Interpretation != null) {
                        $scope.InterpritationDetail29 = item.Interpretation;
                        $scope.Interpritations.push({
                            'Interpretation': $scope.InterpritationDetail29,
                            'MatchIdentity': 29
                        });
                    }
                    if (item.InterpretationB != null) {
                        $scope.InterpritationDetail29_b = item.InterpretationB;
                        $scope.Interpritations.push({
                            'InterpretationB': $scope.InterpritationDetail29,
                            'MatchIdentity': 29
                        });
                    }
                    if (item.InterpretationC != null) {
                        $scope.InterpritationDetail29_c = item.InterpretationC;
                        $scope.Interpritations.push({
                            'InterpretationC': $scope.InterpritationDetail29_c,
                            'MatchIdentity': 29
                        });
                    }
                }

                else {
                    //$scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });

                }
            })
            //For Getting All Results For Hematology From Response Array[](Ends)
            $scope.PusCells1 = "";
            $scope.EpithelialCells1 = "";
            $scope.RbC1 = "";
            $scope.OrganismA = "";
            $scope.OrganismB = "";
            $scope.OrganismC = "";
            $scope.GrowthType = "";
            $scope.Colony = "";
            $scope.Incubation = "";
            $scope.BloodCs = "";

            if (response.microBoilogy[0]) {
                $scope.Culture.PusCells1 = response.microBoilogy[0].PusCells;
                $scope.Culture.EpithelialCells1 = response.microBoilogy[0].EpithelialCells;
                $scope.Culture.RbC1 = response.microBoilogy[0].RBC;
                $scope.PusCells1 = response.microBoilogy[0].PusCells;
                $scope.EpithelialCells1 = response.microBoilogy[0].EpithelialCells;
                $scope.RbC1 = response.microBoilogy[0].RBC;

                $scope.Culture.OrganismIsolatedA = response.microBoilogy[0].OrganismIsolatedA;
                $scope.Culture.OrganismIsolatedB = response.microBoilogy[0].OrganismIsolatedB;
                $scope.Culture.OrganismIsolatedC = response.microBoilogy[0].OrganismIsolatedC;
                $scope.OrganismA = response.microBoilogy[0].OrganismIsolatedA;
                $scope.OrganismB = response.microBoilogy[0].OrganismIsolatedB;
                $scope.OrganismC = response.microBoilogy[0].OrganismIsolatedC;

                $scope.GrowthType = response.microBoilogy[0].GrowthType;
                $scope.Culture.GrowthType = response.microBoilogy[0].GrowthType;
                $scope.Colony = response.microBoilogy[0].ColonyCount;
                $scope.Culture.ColonyCount = response.microBoilogy[0].ColonyCount;
                $scope.Incubation = response.microBoilogy[0].Incubation;
                $scope.Culture.Incubation = response.microBoilogy[0].Incubation;
                $scope.BloodCs = response.microBoilogy[0].NonGrowthBloodCsMassage;
            }
            if (response.microBoilogy != 0) {
                $scope.MicroBio.Id = 1; // for re-Updating...!
            }
            else {
                $scope.MicroBio.Id = 0; // for re-Updating...!
            }

            $scope.PrintedBy_Microbiology = response.printedBy;
            $scope.PrintedTime_Microbiology = response.printedTime;

        }).error(function myError(response) {
            //$scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });
        });
    }

    //===========GetMicroBoilogyById(Ends)=================

   
    //=======Analyzer(Ends)===========

    // ==========GetHematologyById(Starts)===========

    $scope.GetHematologyById = function () {
        $scope.HematoPathologist = undefined;
        $scope.HematoPathologisttwo = undefined;
        $scope.HematoPathologistthree = undefined;
        $scope.HematoPathologistSearch = undefined;
        $scope.HematoPathologistSearchtwo = undefined;
        $scope.HematoPathologistSearchthree = undefined;

        $http({
            method: "POST",
            url: "GetHematologyById?id=" + ($scope.TestOrdId)

        }).success(function mySucces(response) {
            $scope.CBCRowData = response.CBCRowData;

            $scope.HGB.TestResult = "";
            $scope.ESR.TestResult = "";
            $scope.HGB.TestResult = "";
            $scope.WBC.TestResult = "";

            $scope.NEU.TestResult = "";
            $scope.LYM.TestResult = "";
            $scope.MON.TestResult = "";
            $scope.EOS.TestResult = "";
            $scope.BAS.TestResult = "";
            $scope.Other01.TestResult = "";
            $scope.Other01.OtherResult = "";
            $scope.Other02.TestResult = "";
            $scope.Other02.OtherResult = "";
            $scope.Other03.TestResult = "";
            $scope.Other03.OtherResult = "";

            $scope.Neutrophil.TestResult = "";
            $scope.Lymphocyte.TestResult = "";
            $scope.Monocyte.TestResult = "";
            $scope.Eosinophil.TestResult = "";
            $scope.Basophil.TestResult = "";

            $scope.PLT.TestResult = "";
            $scope.RBC.TestResult = "";
            $scope.HCT.TestResult = "";
            $scope.MCV.TestResult = "";
            $scope.MCH.TestResult = "";
            $scope.MCHC.TestResult = "";

            $scope.RDW.TestResult = "";
            $scope.MPV.TestResult = "";
            $scope.PDW.TestResult = "";
            $scope.MP.TestResult = "";
            $scope.MPC.TestResult = "";
            $scope.PCT.TestResult = "";

            $scope.BT.TestResult = "";
            $scope.BTSecond.TestResult = "";
            $scope.CT.TestResult = "";
            $scope.CTSecond.TestResult = "";
            $scope.CE.TestResult = "";
            $scope.EC.TestResult = "";
            $scope.RC.TestResult = "";
            $scope.RDWSD.TestResult = "";
            $scope.PLCR.TestResult = "";
            $scope.IG.TestResult = "";
            debugger;
            if (response.haematologyResults.length > 0 && response.haematologyResults[0].PathologistId > 0) {
                $scope.HematologyPathologistId = response.haematologyResults[0].PathologistId;
                $scope.HematoPathologist = $scope.Consultants.filter(x => x.Id == $scope.HematologyPathologistId)[0];
                $scope.HematoPathologistSearch = $scope.HematologyPathologistId;

            }
            if (response.haematologyResults.length > 0 && response.haematologyResults[0].PathologistId2 > 0) {
                $scope.HematoPathologistSearchtwo = response.haematologyResults[0].PathologistId2;
                $scope.HematoPathologisttwo = $scope.Consultants.filter(x => x.Id == $scope.HematoPathologistSearchtwo)[0];

            }
            if (response.haematologyResults.length > 0 && response.haematologyResults[0].PathologistId3 > 0) {
                $scope.HematoPathologistSearchthree = response.haematologyResults[0].PathologistId3;
                $scope.HematoPathologistthree = $scope.Consultants.filter(x => x.Id == $scope.HematoPathologistSearchthree)[0];

            }
            else
            {
                if ($scope.CompanyName == "ZamZam Hospital Limited") {

                    $scope.HematoPathologist = $scope.defaultLabTechnician.ConsultantName;
                    $scope.HematologyPathologistId = $scope.defaultLabTechnician.Id;
                    $scope.HematoPathologistSearch = $scope.defaultLabTechnician.Id;

                }
                else {
                    $scope.HematoPathologist = {
                        "ConsultantName": '',
                        "Id": 0
                    };
                    debugger;
                    var lastHematologyTechnician = $.cookie("lastHematologyTechnician");
                    if (lastHematologyTechnician != undefined) {
                        $scope.HematoPathologists = JSON.parse(lastHematologyTechnician);
                        $scope.HematoPathologist = $scope.HematoPathologists.ConsultantName;
                        $scope.HematoPathologistSearch = $scope.HematoPathologists.Id;
                        $scope.HematologyPathologistId = $scope.HematoPathologists.Id;
                    }

                    if ($scope.HaematologyCheckbox == true) {
                        $scope.HematoPathologist = JSON.parse(lastHematologyTechnician);
                    }
                }
            }
            if (response.haematologyResults[0].AnalyzerId > 0) {
                $scope.HematologyAnalyzerId = response.haematologyResults[0].AnalyzerId;
                $scope.HematoAnalyzer = $scope.HematologyAnalyzer.filter(x => x.Id == $scope.HematologyAnalyzerId)[0];
            }
            else {
                $scope.HematologyAnalyzerId = response.HematologyAnalyzerId[0];
                $scope.HematoAnalyzer = response.HematoAnalyzerName;
            }
            $scope.HematoSpecimenNote = response.haematologyResults[0].SpecimenNote;
            
            if (response.haematologyResults[0].CheckedBySignId > 0) {
                $scope.HematologyCheckedBySignId = response.haematologyResults[0].CheckedBySignId;
                $scope.HematoCheckedBy = $scope.CheckedByList.filter(x => x.Id == $scope.HematologyCheckedBySignId)[0];
            }
            else {
                $scope.HematologyCheckedBySignId = null;
            }
            if (response.haematologyResults[0].MedicalTechologistSignId > 0) {
                $scope.HematologyMedicalTechologistSignId = response.haematologyResults[0].MedicalTechologistSignId;
                $scope.HematoMedicalTechologistBy = $scope.MedicalTechologistList.filter(x => x.Id == $scope.HematologyMedicalTechologistSignId)[0];
            }
            else {
                $scope.HematologyMedicalTechologistSignId = null;
            }

            //var specimenId = $scope.BioChemicalResults[0].Specimen;
            //if (!specimenId) {
            //    specimenId = 1;
            //}
            //$scope.Speciment = $filter('filter')($scope.Specimens, { Id: specimenId })[0];
            //$scope.SpecimenName = $scope.Speciment.Specimen;

            //$scope.Specimen = $scope.Speciment.Specimen;
            //$scope.BoiSpecimen = $scope.Speciment.Id;


            //else {
            //var lastHematologyTechnician = $.cookie("lastHematologyTechnician");
            //if (lastHematologyTechnician != null) {
            //    $scope.HematoPathologist = JSON.parse(lastHematologyTechnician);
            //    $scope.HematologyPathologistId = $scope.HematoPathologist.Id;
            //}
            
           
            // }

            angular.forEach(response.haematologyResults, function (item) {

                if (item.OtherResult != null && item.TestName == 'Other-01') {
                    $scope.Other01.OtherResult = item.OtherResult; //for other cell Name...new added
                }
                if (item.OtherResult != null && item.TestName == 'Other-02') {
                    $scope.Other02.OtherResult = item.OtherResult; //for other cell Name...new added
                }

                if (item.OtherResult != null && item.TestName == 'Other-03') {
                    $scope.Other03.OtherResult = item.OtherResult; //for other cell Name(Without TotalDc%) calculation...new added
                }

                $scope.HematologyPrintStatus = item.PrintStatus; // For Getting 'PrintStatus'...!

                var name = item.TestName;
                if (name == "HGB") {
                    $scope.HGB.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "ESR") {
                    $scope.ESR.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "WBC") {
                    $scope.WBC.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "NEU%") {
                    $scope.NEU.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "LYM%") {
                    $scope.LYM.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "MON%") {
                    $scope.MON.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "EOS%") {
                    $scope.EOS.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "BAS%") {
                    $scope.BAS.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "Other-01") {
                    $scope.Other01.TestResult = item.TestResult;
                    $scope.Other01.OtherResult = item.OtherResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "Other-02") {
                    $scope.Other02.TestResult = item.TestResult;
                    $scope.Other02.OtherResult = item.OtherResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "Other-03") {
                    $scope.Other03.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "NEU") {
                    if ($scope.CompanyName == "Prime Hospital Ltd." || $scope.CompanyName == "TMSS Medical College & Rafatullah Community Hospital") {
                        $scope.Neutrophil.TestResult = item.TestResult;
                        $scope.LisPatient.Remarks = item.Remarks;
                    }
                    else {
                        $scope.NEU.TestResult = item.TestResult;
                        $scope.LisPatient.Remarks = item.Remarks;
                    }
                }
                else if (name == "LYM") {
                    if ($scope.CompanyName == "Prime Hospital Ltd." || $scope.CompanyName == "TMSS Medical College & Rafatullah Community Hospital") {
                        $scope.Lymphocyte.TestResult = item.TestResult;
                        $scope.LisPatient.Remarks = item.Remarks;
                    }
                    else {
                        $scope.LYM.TestResult = item.TestResult;
                        $scope.LisPatient.Remarks = item.Remarks;
                    }
                }
                else if (name == "MON") {
                    $scope.Monocyte.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "EOS") {
                    $scope.Eosinophil.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "BAS") {
                    $scope.Basophil.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "PLT") {
                    $scope.PLT.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "RDW") {
                    $scope.RDW.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "RDW-CV")
                {
                    $scope.RDW.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "BT") {
                    $scope.BT.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "BTSec") {
                    $scope.BTSecond.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "RBC") {
                    $scope.RBC.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "MPV") {
                    $scope.MPV.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "CT") {
                    $scope.CT.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "CTSec") {
                    $scope.CTSecond.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "HCT") {
                    $scope.HCT.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "PDW") {
                    $scope.PDW.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "C/E") {
                    $scope.CE.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }

                else if (name == "MCV") {
                    $scope.MCV.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "MP") {
                    $scope.MP.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "EC") {
                    $scope.EC.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }

                else if (name == "MCH") {
                    $scope.MCH.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "MPC") {
                    $scope.MPC.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "RC") {
                    $scope.RC.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "MCHC") {
                    $scope.MCHC.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "PCT") {
                    $scope.PCT.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "RDW-SD") { // test name ki ase dakte hobe
                    $scope.RDWSD.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "P-LCR") { // test name ki ase dakte hobe
                    $scope.PLCR.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }
                else if (name == "IG%") { // test name ki ase dakte hobe
                    $scope.IG.TestResult = item.TestResult;
                    $scope.LisPatient.Remarks = item.Remarks;
                }

                if ($scope.CompanyName == "KB Lab & Medicare Ltd.") {
                    CKEDITOR.instances.editor4.setData($scope.LisPatient.Remarks);
                }


            });

            $scope.CalculateTotalDC();

            if (response.haematologyResults != 0) {
                $scope.LisPatient.Id = 1; // for re-Updating...!
            }
            else {
                $scope.LisPatient.Id = 0; // for re-Updating...!
            }

            $scope.PrintedBy_Haematology = response.printedBy;
            $scope.PrintedTime_Haematology = response.printedTime;

        }).error(function myError(response) {
            //$scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });
        });
    }

    // ==========GetHematologyById(End)===========

    //For Getting BioChem Info(Starts)

    $scope.SpecimenName = "";
    $scope.UrinSpecimentName = "";
    $scope.GetBioChemById = function () {
        $http({
            method: "POST",
            url: "GetBioChemById?id=" + ($scope.TestOrdId)
        }).success(function mySucces(response) {
            $scope.BioChemicalResults = $filter('filter')(response.bioChemicalResults, { TestGroupId: 1 }); // for filtering TestGroup wise Results. 
            $scope.BioRowData = response.bioRowData;

            if (response.bioChemicalResults.length > 0 && response.bioChemicalResults[0].PathologistId > 0) {
                $scope.BioChemicalPathologistId = response.bioChemicalResults[0].PathologistId;
                $scope.BioChemicalPathologist = $scope.Consultants.filter(x => x.Id == $scope.BioChemicalPathologistId)[0];
                $scope.BioChemicalPathologistSearch = $scope.BioChemicalPathologistId;

            }
            if (response.bioChemicalResults[0].PathologistId2 > 0) {
                $scope.BioChemicalPathologistSearchtwo = response.bioChemicalResults[0].PathologistId2;
                $scope.BioChemicalPathologisttwo = $scope.Consultants.filter(x => x.Id == $scope.BioChemicalPathologistSearchtwo)[0];

            }
            if (response.bioChemicalResults[0].PathologistId3 > 0) {
                $scope.BioChemicalPathologistSearchthree = response.bioChemicalResults[0].PathologistId3;
                $scope.BioChemicalPathologistthree = $scope.Consultants.filter(x => x.Id == $scope.BioChemicalPathologistSearchthree)[0];
            }

            if ($scope.CompanyName == "INSAF BARAKAH KIDNEY & GENERAL HOSPITAL")
            {
                var CholesterolTotal = 0;
                var CholesterolHDL = 0;
                angular.forEach($scope.BioChemicalResults, function (item) {

                    if (item.TestParticularId == 479) {
                        CholesterolTotal = item.TestResult;
                    }
                    if (item.TestParticularId == 482) {
                        CholesterolHDL = item.TestResult;
                    }
                    if (item.TestParticularId == 1334) {
                        if (CholesterolTotal > 0) {
                            item.TestResult = Number(CholesterolTotal / CholesterolHDL).toFixed(2);
                        }
                    }


                    if (item.TestParticularId == 484) {
                        item.TestResult = Number(item.TestResult).toFixed(0);
                    }
                });
            }

            //for Setting Save Or Update Condition By Checking BioChems Array...!
            if ($scope.BioChemicalResults.length > 0) {
                $scope.BoiChemical.Id = 1;
                $scope.BioPrintStatus = $scope.BioChemicalResults[0].PrintStatus;

                if ($scope.BioChemicalResults[0].AnalyzerId > 0) {
                    $scope.BioChemAnalyzerId = $scope.BioChemicalResults[0].AnalyzerId;
                    $scope.BioChemAnalyzers = $scope.BioChemAnalyzer.filter(x => x.Id == $scope.BioChemAnalyzerId)[0];

                }
                else {
                    $scope.BioChemAnalyzerId = response.BioChemicalAnalyzerId[0];
                    $scope.BioChemAnalyzers = response.BioChemicalAnalyzerName;
                }
                $scope.BoiSpecimenNote = $scope.BioChemicalResults[0].SpecimenNote;

                $scope.BioChemicalPathologistId = null;
                $scope.BioChemCheckedBySignId = null;
                $scope.BioChemMedicalTechologistSignId = null;
                angular.forEach($scope.BioChemicalResults, function (item) {
                    if ($scope.BioChemicalPathologistId == null) {
                        $scope.BioChemicalPathologistId = item.PathologistId;
                    }
                    if ($scope.BioChemCheckedBySignId == null) {
                        $scope.BioChemCheckedBySignId = item.CheckedBySignId;
                    }
                    if ($scope.BioChemMedicalTechologistSignId == null) {
                        $scope.BioChemMedicalTechologistSignId = item.MedicalTechologistSignId;
                    }
                });

                if ($scope.BioChemCheckedBySignId > 0) {
                    $scope.BioChemCheckedBy = $scope.CheckedByList.filter(x => x.Id == $scope.BioChemCheckedBySignId)[0];
                }
                else {
                    $scope.BioChemCheckedBySignId = null;
                }

                if ($scope.BioChemMedicalTechologistSignId > 0) {
                    $scope.BioChemMedicalTechologistBy = $scope.MedicalTechologistList.filter(x => x.Id == $scope.BioChemMedicalTechologistSignId)[0];
                }
                else {
                    $scope.BioChemMedicalTechologistSignId = null;
                }

                var specimenId = $scope.BioChemicalResults[0].SpecimenId;
                if (!specimenId) {
                    specimenId = 1;
                }
                $scope.Speciment = $filter('filter')($scope.Specimens, { Id: specimenId })[0];
                $scope.SpecimenName = $scope.Speciment.Specimen;

                $scope.Specimen = $scope.Speciment.Specimen;
                $scope.BoiSpecimen = $scope.Speciment.Id;


                if ($scope.BioChemicalPathologistId > 0) {
                    $scope.BioChemicalPathologist = $filter('filter')($scope.Consultants, { Id: $scope.BioChemicalPathologistId })[0];
                    var lastBioChemicalTechnician = $.cookie("lastBioChemicalTechnician");
                    if ($scope.BioChemistryCheckbox == true) {
                        $scope.BioChemicalPathologist = JSON.parse(lastBioChemicalTechnician);
                        $scope.BioChemicalPathologistId = $scope.BioChemicalPathologist.Id;
                    }
                    $scope.BioChemicalPathologistSearch = $scope.BioChemicalPathologistId;
                }
                else {
                    $scope.Speciment = $filter('filter')($scope.Specimens, { Id: 1 })[0];
                    $scope.Specimen = $scope.Speciment.Specimen;
                    $scope.BoiSpecimen = $scope.Speciment.Id;

                    if ($scope.CompanyName == "ZamZam Hospital Limited")
                    {

                        $scope.BioChemicalPathologist = $scope.defaultLabTechnician.ConsultantName;
                        $scope.BioChemicalPathologistId = $scope.defaultLabTechnician.Id;
                        $scope.BioChemicalPathologistSearch = $scope.defaultLabTechnician.Id;

                    }
                    else
                    {
                        $scope.BioChemicalPathologist = {
                            "ConsultantName": '',
                            "Id": 0
                        };

                        var lastBioChemicalTechnician = $.cookie("lastBioChemicalTechnician");
                        if (lastBioChemicalTechnician != undefined) {
                            $scope.lastBioChemicalTechnician = JSON.parse(lastBioChemicalTechnician);
                            $scope.BioChemicalPathologist = $scope.lastBioChemicalTechnician.ConsultantName;
                            $scope.BioChemicalPathologistSearch = $scope.lastBioChemicalTechnician.Id;
                            $scope.BioChemicalPathologistId = $scope.lastBioChemicalTechnician.Id;
                        }
                       

                        if ($scope.BioChemistryCheckbox == true) {
                            $scope.BioChemicalPathologist = JSON.parse(lastBioChemicalTechnician);
                            $scope.BioChemicalPathologistId = $scope.BioChemicalPathologist.Id;
                        }
                    }
                   
                }
                $scope.PrintedBy_BioChemical = response.printedBy;
                $scope.PrintedTime_BioChemical = response.printedTime;
            }
            else {
                $scope.BoiChemical.Id = 0;
                $scope.BioPrintStatus = 1;

                var lastBioChemicalTechnician = $.cookie("lastBioChemicalTechnician");
                if (lastBioChemicalTechnician != undefined) {
                    $scope.lastBioChemicalTechnician = JSON.parse(lastBioChemicalTechnician);
                    $scope.BioChemicalPathologist = $scope.lastBioChemicalTechnician.ConsultantName;
                    $scope.BioChemicalPathologistSearch = $scope.lastBioChemicalTechnician.Id;
                    $scope.BioChemicalPathologistId = $scope.lastBioChemicalTechnician.Id;
                }

                if ($scope.BioChemistryCheckbox == true) {
                    $scope.BioChemicalPathologistId = JSON.parse(lastBioChemicalTechnician);
                }

                if ($scope.CompanyName == "ZamZam Hospital Limited") {

                    $scope.BioChemicalPathologist = $scope.defaultLabTechnician.ConsultantName;
                    $scope.BioChemicalPathologistId = $scope.defaultLabTechnician.Id;
                    $scope.BioChemicalPathologistSearch = $scope.defaultLabTechnician.Id;

                }


            }

        }).error(function myError(response) {
            //$scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });
        });
    }

    $scope.GetSerologyById = function () {

        $http({
            method: "POST",
            url: "GetSerologyById?id=" + ($scope.TestOrdId)
        }).success(function mySucces(response) {
            $scope.Serologys = $filter('filter')(response.testParticulars, { TestGroupId: 9 }); // for filtering TestGroup wise Results.
            debugger;
            $scope.SeroPrintStatus = response.PrintStatus; // For Getting 'PrintStatus'...!

            var specimenId = 1;

            if ($scope.Serologys.length > 0) {
                specimenId = $scope.Serologys[0].SpecimenId;

                if ($scope.Serologys[0].AnalyzerId > 0) {
                    $scope.SerologyAnalyzerId = $scope.Serologys[0].AnalyzerId;
                    $scope.SerologyAnalyzer = $scope.SerologyAnalyzers.filter(x => x.Id == $scope.SerologyAnalyzerId)[0].AnalyzerName;

                }
                else {
                    $scope.SerologyAnalyzerId = response.SerologyAnalyzerId[0];
                    $scope.SerologyAnalyzer = response.SerologyAnalyzerName;

                }

                $scope.SerologyCheckedBySignId = null;
                $scope.SerologyMedicalTechologistSignId = null;
                angular.forEach($scope.Serologys, function (item) {
                    if ($scope.SerologyCheckedBySignId == null) {
                        $scope.SerologyCheckedBySignId = item.CheckedBySignId;
                    }
                    if ($scope.SerologyMedicalTechologistSignId == null) {
                        $scope.SerologyMedicalTechologistSignId = item.MedicalTechologistSignId;
                    }
                });

                if ($scope.SerologyCheckedBySignId > 0) {
                    $scope.SerologyCheckedBy = $scope.CheckedByList.filter(x => x.Id == $scope.SerologyCheckedBySignId)[0];
                }
                else {
                    $scope.SerologyCheckedBySignId = null;
                }
                if ($scope.SerologyMedicalTechologistSignId > 0) {
                    $scope.SerologyMedicalTechologistBy = $scope.MedicalTechologistList.filter(x => x.Id == $scope.SerologyMedicalTechologistSignId)[0];
                }
                else {
                    $scope.SerologyMedicalTechologistSignId = null;
                }

                $scope.SerologySpecimenNote = $scope.Serologys[0].SpecimenNote;
                debugger;
                angular.forEach($scope.Serologys, function (item) {
                    var result = item.SerologyResult || null;
                    if (result != null) {
                        $scope.Serology.Id = 1;

                        if (response.pathologistId.length > 0) {
                            $scope.seroPathologist = {
                                "ConsultantName": response.pathologistId[0].ConsultantName,
                                "Id": response.pathologistId[0].PathologistId
                            };
                        }                        

                        if (response.pathologistId.length > 0) {
                            $scope.SeroConsultantt = response.pathologistId[0].PathologistId;
                            $scope.seroPathologistSearch = $scope.SeroConsultantt;
                        }
                        if (response.pathologistId2.length > 0) {
                            $scope.seroPathologistSearchtwo = response.pathologistId2[0].PathologistId2;
                            $scope.seroPathologisttwo = $scope.Consultants.filter(x => x.Id == $scope.seroPathologistSearchtwo)[0];
                        }
                        if (response.pathologistId3.length > 0) {
                            $scope.seroPathologistSearchthree = response.pathologistId3[0].PathologistId3;
                            $scope.seroPathologistthree = $scope.Consultants.filter(x => x.Id == $scope.seroPathologistSearchthree)[0];
                        }
                        else
                        {
                            if ($scope.CompanyName == "ZamZam Hospital Limited") {

                                $scope.seroPathologist = $scope.defaultLabTechnician.ConsultantName;
                                $scope.SeroConsultantt = $scope.defaultLabTechnician.Id;
                                $scope.seroPathologistSearch = $scope.defaultLabTechnician.Id;

                            }
                            else {
                                $scope.seroPathologist = {
                                    "ConsultantName": '',
                                    "Id": 0
                                };

                                var lastSerologyTechnician = $.cookie("lastSerologyTechnician");
                                if (lastSerologyTechnician != undefined) {
                                    $scope.seroPathologists = JSON.parse(lastSerologyTechnician);
                                    $scope.seroPathologist = $scope.seroPathologists.ConsultantName;
                                    $scope.seroPathologistSearch = $scope.seroPathologists.Id;
                                    $scope.SeroConsultantt = $scope.seroPathologists.Id;
                                }

                                if ($scope.SerologyCheckbox == true) {
                                    $scope.seroPathologist = JSON.parse(lastSerologyTechnician);
                                }
                            }
                            
                        }
                        
                       

                    }
                });

                $scope.PrintedBy_Serology = response.printedBy;
                $scope.PrintedTime_Serology = response.printedTime;
            }
            else {
                $scope.Serology.Id = 0;
            }

            if (!specimenId) {
                specimenId = 1;
            }
            $scope.SerologySpeciment = $filter('filter')($scope.Specimens, { Id: specimenId })[0];
            //$scope.SerologySpeciment = $scope.SerologySpeciment.Specimen;
            $scope.SeroSpecimen = $scope.SerologySpeciment.Id;

        }).error(function myError(response) {
            //$scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });
        });
    }
    //For Getting Serology Info(Ends)

    //For Getting Hormone Info(Starts)


    $scope.GetHormoneById = function () {
        debugger;
        $http({
            method: "POST",
            url: "GetHormoneById?id=" + ($scope.TestOrdId)
        }).success(function mySucces(response) {
            $scope.Hormones = $filter('filter')(response.testParticulars, { TestGroupId: 4 });
            
            $scope.ImmoRowData = response.immoRowData;
            $scope.ImmunoPrintStatus = response.PrintStatus; // For Getting 'PrintStatus'...!
            debugger;
            if (response.pathologistId.length > 0) {
                $scope.ImmunoPathologistSearch = response.pathologistId[0].PathologistId;
            }
            
            if (response.pathologistId2.length > 0) {
                $scope.ImmunoPathologistSearchtwo = response.pathologistId2[0].PathologistId2;
                $scope.ImmunoPathologisttwo = $scope.Consultants.filter(x => x.Id == $scope.ImmunoPathologistSearchtwo)[0];
            }
            if (response.pathologistId3.length > 0) {
                $scope.ImmunoPathologistSearchthree = response.pathologistId3[0].PathologistId3;
                $scope.ImmunoPathologistthree = $scope.Consultants.filter(x => x.Id == $scope.ImmunoPathologistSearchthree)[0];
            }

            var specimenId = 1;
            if ($scope.Hormones.length > 0) {
                specimenId = $scope.Hormones[0].SpecimenId;

                if ($scope.Hormones[0].AnalyzerId > 0) {
                    $scope.ImmunologyAnalyzerId = $scope.Hormones[0].AnalyzerId;
                    $scope.ImmunologyAnalyzer = $scope.ImmunologyAnalyzers.filter(x => x.Id == $scope.ImmunologyAnalyzerId)[0].AnalyzerName;

                }
                else {
                    $scope.ImmunologyAnalyzerId = response.ImmunologyAnalyzerId[0];
                    $scope.ImmunologyAnalyzer = response.ImmunologyAnalyzerName;

                }

                $scope.ImmunologyCheckedBySignId = null;
                $scope.ImmunologyMedicalTechologistSignId = null;
                angular.forEach($scope.Hormones, function (item) {
                    if ($scope.ImmunologyCheckedBySignId == null) {
                        $scope.ImmunologyCheckedBySignId = item.CheckedBySignId;
                    }
                    if ($scope.ImmunologyMedicalTechologistSignId == null) {
                        $scope.ImmunologyMedicalTechologistSignId = item.MedicalTechologistSignId;
                    }
                });

                if ($scope.ImmunologyCheckedBySignId > 0) {
                    $scope.ImmunologyCheckedBy = $scope.CheckedByList.filter(x => x.Id == $scope.ImmunologyCheckedBySignId)[0];
                }
                else {
                    $scope.ImmunologyCheckedBySignId = null;
                }

                if ($scope.ImmunologyMedicalTechologistSignId > 0) {
                    $scope.ImmunologyMedicalTechologistBy = $scope.MedicalTechologistList.filter(x => x.Id == $scope.ImmunologyMedicalTechologistSignId)[0];
                }
                else {
                    $scope.ImmunologyMedicalTechologistSignId = null;
                }

                $scope.ImmunologySpecimenNote = $scope.Hormones[0].SpecimenNote;

                angular.forEach($scope.Hormones, function (item) {

                    var result = item.HormoneResult || null;
                    if (result != null) {
                        $scope.Hormone.Id = 1;
                        if (response.pathologistId.length > 0) {
                            $scope.ImmunooConsultantt = response.pathologistId[0].PathologistId;
                            $scope.ImmunoPathologistSearch = response.pathologistId[0].PathologistId;

                            $scope.ImmunoPathologist = {
                                "ConsultantName": response.pathologistId[0].ConsultantName,
                                "Id": response.pathologistId[0].PathologistId
                            };
                        }
                        else
                        {
                            if ($scope.CompanyName == "ZamZam Hospital Limited") {

                                $scope.ImmunoPathologist = $scope.defaultLabTechnician.ConsultantName;
                                $scope.ImmunooConsultantt = $scope.defaultLabTechnician.Id;
                                $scope.ImmunoPathologistSearch = $scope.defaultLabTechnician.Id;

                            }
                            else {
                                $scope.ImmunoPathologist = {
                                    "ConsultantName": '',
                                    "Id": 0
                                };

                                var lastImmunologyTechnician = $.cookie("lastImmunologyTechnician");
                                if (lastImmunologyTechnician != undefined) {
                                    $scope.ImmunoPathologists = JSON.parse(lastImmunologyTechnician);
                                    $scope.ImmunoPathologist = $scope.ImmunoPathologists.ConsultantName;
                                    $scope.ImmunooConsultantt = $scope.ImmunoPathologists.Id;
                                    $scope.ImmunoPathologistSearch = $scope.ImmunoPathologists.Id;
                                }
                               

                                if ($scope.ImmunologyCheckbox == true) {
                                    $scope.ImmunoPathologist = JSON.parse(lastImmunologyTechnician);
                                }
                            }
                        }
                    }
                    else {
                        $scope.ImmunoPathologist = {
                            "ConsultantName": '',
                            "Id": 0
                        };

                        var lastImmunologyTechnician = $.cookie("lastImmunologyTechnician");
                        if (lastImmunologyTechnician != undefined) {
                            $scope.ImmunoPathologists = JSON.parse(lastImmunologyTechnician);
                            $scope.ImmunoPathologist = $scope.ImmunoPathologists.ConsultantName;
                            $scope.ImmunooConsultantt = $scope.ImmunoPathologists.Id;
                            $scope.ImmunoPathologistSearch = $scope.ImmunoPathologists.Id;
                        }
                       

                        if ($scope.ImmunologyCheckbox == true) {
                            $scope.ImmunoPathologist = JSON.parse(lastImmunologyTechnician);
                        }
                    }
                });

                $scope.PrintedBy_Immunology = response.printedBy;
                $scope.PrintedTime_Immunology = response.printedTime;
            }
            else {
                $scope.Hormone.Id = 0;
            }
            if (!specimenId) {
                specimenId = 1;
            }
            $scope.ImmunologySpeciment = $filter('filter')($scope.Specimens, { Id: specimenId })[0];
            $scope.ImmuSpecimen = $scope.ImmunologySpeciment.Id;
        }).error(function myError(response) {
            //$scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });
        });
    }

    //For Getting Hormone Info(Ends)

    // Save LisHematology
    $scope.SaveLisHematology = function () {
        debugger;
        $scope.submitted = true; 
        if ($scope.frmHaematology.HematoAnalyzerName.$invalid) {
            return;
        }

        if ($scope.frmHaematology.HematoConsultantName.$invalid) {
            return;
        }
        if ($scope.CompanyName == "KB Lab & Medicare Ltd.") {
            $scope.LisPatient.Remarks = CKEDITOR.instances.editor4.getData();
        }
        if ($scope.LisPatient.LisHematologys != 0) {
            if ($scope.LisPatient.TotalDc == 0 || $scope.LisPatient.TotalDc == 100) {
                var url = "SaveLisHematology";
                if ($scope.LisPatient.Id > 0) {
                    url = "UpdateLisHematology";
                }

                debugger;
                angular.forEach($scope.LisPatient.LisHematologys, function (item) {                   
                    var consultant = $scope.HematologyPathologistId || null;
                    if (consultant != null) {
                        item.PathologistId = $scope.HematologyPathologistId;
                    }
                    if (consultant == null) {
                        item.PathologistId = null;
                    }

                    if ($scope.HematoPathologistSearchtwo != undefined)
                    {
                        consultant = $scope.HematoPathologistSearchtwo || null;
                        if (consultant != null) {
                            item.PathologistId2 = $scope.HematoPathologistSearchtwo;
                        }
                    }
                    if ($scope.HematoPathologistSearchthree != undefined) {
                        consultant = $scope.HematoPathologistSearchthree || null;
                        if (consultant != null) {
                            item.PathologistId3 = $scope.HematoPathologistSearchthree;
                        }
                    }                    
                    
                });
                debugger;
                angular.forEach($scope.LisPatient.LisHematologys, function (item) {
                    if ($scope.SelectedHematologyAnalyzerId > 0 && $scope.HematoAnalyzer != null) {
                        item.AnalyzerId = $scope.SelectedHematologyAnalyzerId;
                    }
                    else if ($scope.HematoAnalyzer == null) {
                        item.AnalyzerId = null;
                    }
                    else {
                        item.AnalyzerId = $scope.HematologyAnalyzerId;
                    }
                    item.SpecimenNote = $scope.HematoSpecimenNote;

                    // HematologyCheckedBySignId
                    if ($scope.SelectedHematologyCheckedBySignId > 0 && $scope.HematoCheckedBy != null) {
                        item.CheckedBySignId = $scope.SelectedHematologyCheckedBySignId;
                    }
                    else if ($scope.HematoCheckedBy == null) {
                        item.CheckedBySignId = null;
                    }
                    else {
                        item.CheckedBySignId = $scope.HematologyCheckedBySignId;
                    }

                    // HematologyMedicalTechologistSignId
                    if ($scope.SelectedHematologyMedicalTechologistSignId > 0 && $scope.HematoMedicalTechologistBy != null) {
                        item.MedicalTechologistSignId = $scope.SelectedHematologyMedicalTechologistSignId;
                    }
                    else if ($scope.HematoMedicalTechologistBy == null) {
                        item.MedicalTechologistSignId = null;
                    }
                    else {
                        item.MedicalTechologistSignId = $scope.HematologyMedicalTechologistSignId;
                    }

                });
                debugger;
                $http({
                    method: "POST",
                    url: url,
                    data: {
                        testCBCResult: $scope.LisPatient.LisHematologys,
                        remarks: $scope.LisPatient.Remarks,
                        pdtDate: $scope.TestOrderIdLoadDate,
                        testOrderId: $scope.TestOrdId
                    }
                }).success(function mySucces(response) {
                    if (response.Success) {
                        if (response.PrimaryId != 0) {
                            $scope.LisPatient.Id = 1;
                        }
                        else {
                            $scope.LisPatient.Id = 0;
                        }

                        $scope.IsClickedHeamatology = 2;
                        $scope.submitted = false;
                        $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
                        $scope.GetHematologyById();
                    }
                    else {
                        $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
                    }
                }).error(function myError(response) {
                    $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
                });
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.lisDCAlert });
            }
        }
        else {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.detailItem });
        }
    };

    // Update LisHematology
    $scope.UpdateLisHematology = function () {

        $http({
            method: "POST",
            url: "UpdateLisHematology",
            data: { testCBCResult: $scope.LisPatient.LisHematologys, remarks: $scope.LisPatient.Remarks, pdtDate: $scope.TestOrderIdLoadDate, testOrderId: $scope.TestOrdId }
            //data: $scope.ComponentPreparation

        }).success(function mySucces(response) {
            if (response) {
                $scope.LisPatient.Id = response.Id;
                $scope.submitted = false;
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.update });
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            }
        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };

    $scope.setBioChemicalSpeciment = function () {
        $scope.SpecimenName = $scope.Speciment;
    }
    $scope.setUrinarySpeciment = function () {
        $scope.UrinSpecimentName = $scope.UrinarySpeciment;
    }
    $scope.setHaematologySpeciment = function () {
        $scope.HaematologySpecimentName = $scope.HaematologySpeciment;
    }

    $scope.setLabSpeciment = function () {
        $scope.LabSpecimenName = $scope.LabSpeciment;
    }
    $scope.setMicroBiologySpeciment = function () {
        $scope.MicrobiologySpeciman = $scope.MicroBiologySpeciment;
    }
    $scope.setImmunologySpeciment = function () {
        $scope.ImmunologySpeciman = $scope.ImmunologySpeciment;
    }

    $scope.setSerologySpeciment = function () {
        $scope.SerologySpeciman = $scope.SerologySpeciment;
    }
    $scope.setStoolSpeciment = function () {
        $scope.StoolSpecimentName = $scope.StoolSpeciment;
    }

    // Save BioChemical
    $scope.SaveBioChemical = function () {
        debugger;
        if ($scope.BoiSpecimen == null || $scope.BoiSpecimen == 0) {
            $scope.alerts.push({ 'type': 'danger', 'msg': 'Select a Specimen and try again.' });
            return;
        }
        if ($scope.CompanyName == "Prime Hospital Ltd.") {
            //$scope.BioChemicalPathologistId = 1;
        }
        //if ($scope.BioChemicalPathologistId == null) {
        //    $scope.alerts.push({ 'type': 'danger', 'msg': 'Select a Pathologist and try again.' });
        //    return;
        //}
        if ($scope.BioChemicalResults != 0) {
            if ($scope.BoiChemical.Id == 0 || $scope.BoiChemical.Id > 0) {
                var url = "SaveBioChemical";
                if ($scope.BoiChemical.Id > 0) {
                    url = "UpdateBioChemical";
                }
                //For Adding Specimen.
                var isBioChemicalResultBlank = false;
                var BlankBioChemicalTestName = "";
                debugger;
                angular.forEach($scope.BioChemicalResults, function (item) {
                    item.Specimen = $scope.BoiSpecimen;
                    item.SpecimenNote = $scope.BoiSpecimenNote;
                    item.PathologistId = $scope.BioChemicalPathologistId;

                    if ($scope.BioChemicalPathologistSearchtwo != undefined) {
                        item.PathologistId2 = $scope.BioChemicalPathologistSearchtwo;
                    }
                    if ($scope.BioChemicalPathologistSearchthree != undefined) {
                        item.PathologistId3 = $scope.BioChemicalPathologistSearchthree;
                    }

                    if (item.TestResult == "" || item.TestResult == null) {
                        isBioChemicalResultBlank = true;
                        BlankBioChemicalTestName += item.ParticularName + ", ";
                    }

                    if ($scope.SelectedBioChemAnalyzerId > 0 && $scope.BioChemAnalyzers != null) {
                        item.AnalyzerId = $scope.SelectedBioChemAnalyzerId;
                    }
                    else if ($scope.BioChemAnalyzers == null) {
                        item.AnalyzerId = null;
                    }
                    else {
                        item.AnalyzerId = $scope.BioChemAnalyzerId;
                    }

                    ////

                    if ($scope.SelectedBioChemCheckedBySignId > 0 && $scope.BioChemCheckedBy != null) {
                        item.CheckedBySignId = $scope.SelectedBioChemCheckedBySignId;
                    }
                    else if ($scope.BioChemCheckedBy == null) {
                        item.CheckedBySignId = null;
                    }
                    
                    if ($scope.SelectedBioChemMedicalTechologistSignId > 0 && $scope.BioChemMedicalTechologistBy != null) {
                        item.MedicalTechologistSignId = $scope.SelectedBioChemMedicalTechologistSignId;
                    }
                    else if ($scope.BioChemMedicalTechologistBy == null) {
                        item.MedicalTechologistSignId = null;
                    }

                });
                
                if (isBioChemicalResultBlank == true) {
                    if (confirm(BlankBioChemicalTestName + "  value is blank. do you want to save without it ?") == true) {

                    }
                    else {
                        return;
                    }
                }
                debugger;
                $scope.saveButtonDisable = true;
                $http({
                    method: "POST",
                    url: url,
                    //data: $scope.LisPatient.LisHematologys, //specimenId: $scope.Specimen
                    data: { testBoiChemResult: $scope.BioChemicalResults, pdtDate: $scope.TestOrderIdLoadDate, testOrderId: $scope.TestOrdId, SpecimenName: $scope.SpecimenName, remarks: $scope.LisPatient.BiochemicalRemarks }
                }).success(function mySucces(response) {
                    if (response.Success) {
                        if (response.PrimaryId != 0) {//new added
                            $scope.BoiChemical.Id = 1;
                        }
                        else {
                            $scope.BoiChemical.Id = 0;
                        }
                        $scope.IsClickedBioChemical = 2;
                        //$scope.BioChemicalResults = [];
                        $scope.submitted = false;
                        $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
                        $scope.GetBioChemById();
                    }
                    else {
                        $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
                    }
                    $scope.saveButtonDisable = false;
                }).error(function myError(response) {
                    $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
                    $scope.saveButtonDisable = false;
                });
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.lisDCAlert });
            }
        }
        else {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.detailItem });
        }
    };

    // Update BioChemical
    $scope.UpdateBioChemical = function () {

        $http({
            method: "POST",
            url: "UpdateBioChemical",
            data: { testBoiChemResult: $scope.BioChemicalResults, pdtDate: $scope.TestOrderIdLoadDate, testOrderId: $scope.TestOrdId }
            //data: $scope.ComponentPreparation

        }).success(function mySucces(response) {
            if (response) {
                //$scope.LisPatient.Id = response.Id;
                $scope.submitted = false;
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.update });
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            }
        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };

    // Save Serology
    $scope.SaveSerology = function () {
        $scope.submitted = true;
        if ($scope.frmSerology.$invalid) {
            return;
        }
        
        if ($scope.Serologys != 0) {
            if ($scope.Serology.Id == 0 || $scope.Serology.Id > 0) {
                var url = "SaveSerology";
                if ($scope.Serology.Id > 0) {
                    url = "UpdateSerology"; 
                }
                //For Adding Specimen.
                var isSerologyResultBlank = false;
                var BlankSerologyTestName = "";
                //if ($scope.CompanyName == "Prime Hospital Ltd.") {
                //    $scope.BioChemicalPathologistId = 1;
                //}


                angular.forEach($scope.Serologys, function (item) {
                    var specimen = $scope.SeroSpecimen || null;
                    if (specimen != null) {
                        item.Specimen = $scope.SeroSpecimen;
                    }

                    if (item.SerologyResult == "" || item.SerologyResult == null) {
                        isSerologyResultBlank = true;
                        BlankSerologyTestName += item.ParticularName + ", ";
                    }

                    item.SpecimenNote = $scope.SerologySpecimenNote;
                    if ($scope.SelectedSerologyAnalyzerId > 0 && $scope.SerologyAnalyzer != null) {
                        item.AnalyzerId = $scope.SelectedSerologyAnalyzerId;
                    }
                    else if ($scope.SerologyAnalyzer == null) {
                        item.AnalyzerId = null;
                    }
                    else {
                        item.AnalyzerId = $scope.SerologyAnalyzerId;
                    }

                    ///
                    if ($scope.SelectedSerologyCheckedBySignId > 0 && $scope.SerologyCheckedBy != null) {
                        item.CheckedBySignId = $scope.SelectedSerologyCheckedBySignId;
                    }
                    else if ($scope.SerologyCheckedBy == null) {
                        item.CheckedBySignId = null;
                    }

                    ///
                    if ($scope.SelectedSerologyMedicalTechologistSignId > 0 && $scope.SerologyMedicalTechologistBy != null) {
                        item.MedicalTechologistSignId = $scope.SelectedSerologyMedicalTechologistSignId;
                    }
                    else if ($scope.SerologyMedicalTechologistBy == null) {
                        item.MedicalTechologistSignId = null;
                    }
                });

                if (isSerologyResultBlank == true) {
                    if (confirm(BlankSerologyTestName + "  value is blank. do you want to save without it ?") == true) {

                    }
                    else {
                        return;
                    }
                }
                if ($scope.CompanyName == "Prime Hospital Ltd.") {
                    //$scope.SeroConsultantt = 1;
                }


                //For Adding Pathologist Id.
                angular.forEach($scope.Serologys, function (item) {
                    debugger
                    var consultant = $scope.SeroConsultantt || null;
                    if (consultant != null) {
                        item.PathologistId = $scope.SeroConsultantt;
                    }                  
                    if ($scope.seroPathologistSearchtwo != undefined) {
                        debugger;
                        item.PathologistId2 = $scope.seroPathologistSearchtwo;
                    }
                    if ($scope.seroPathologistSearchthree != undefined) {
                        debugger;
                        item.PathologistId3 = $scope.seroPathologistSearchthree;
                    }
                });
                $scope.saveButtonDisable = true;
                $http({
                    method: "POST",
                    url: url,
                    //data: $scope.LisPatient.LisHematologys,
                    data: { testSerologyResult: $scope.Serologys, pdtDate: $scope.TestOrderIdLoadDate, testOrderId: $scope.TestOrdId, Specimen: $scope.SerologySpeciman, remarks: $scope.LisPatient.SerologyRemarks }
                }).success(function mySucces(response) {
                    if (response.Success) {
                        if (response.PrimaryId != 0) {//new added
                            $scope.Serology.Id = 1;
                        }
                        else {
                            $scope.Serology.Id = 0;
                        }
                        $scope.IsClickedSerology = 2;
                        //$scope.Serologys = [];
                        $scope.submitted = false;
                        $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
                        $scope.GetSerologyById();
                    }
                    else {
                        $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
                    }
                    $scope.saveButtonDisable = false;
                }).error(function myError(response) {
                    $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
                    $scope.saveButtonDisable = false;
                });
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.lisDCAlert });
            }
        }
        else {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.detailItem });

        }
    };

    // Update Serology
    $scope.UpdateSerology = function () {
        $scope.saveButtonDisable = true;
        $http({
            method: "POST",
            url: "UpdateSerology",
            data: { testSerologyResult: $scope.Serologys, pdtDate: $scope.TestOrderIdLoadDate, testOrderId: $scope.TestOrdId }
            //data: $scope.ComponentPreparation

        }).success(function mySucces(response) {
            if (response) {
                //$scope.LisPatient.Id = response.Id;
                $scope.submitted = false;
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.update });
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            }
        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };

    $scope.OnPressHormoneF2 = function (data) {
        var index = $scope.Serologys.indexOf(data);
        $scope.Serologys[index].SerologyResult = "'A' (+ve)";

    };
    $scope.OnPressHormoneF3 = function (data) {
        var index = $scope.Serologys.indexOf(data);
        $scope.Serologys[index].SerologyResult = "'A' (-ve)";

    };
    $scope.OnPressHormoneF4 = function (data) {
        var index = $scope.Serologys.indexOf(data);
        $scope.Serologys[index].SerologyResult = "'B' (+ve)";

    };
    $scope.OnPressHormoneF6 = function (data) {
        var index = $scope.Serologys.indexOf(data);
        $scope.Serologys[index].SerologyResult = "'B' (-ve)";

    };

    $scope.OnPressHormoneF7 = function (data) {
        var index = $scope.Serologys.indexOf(data);
        $scope.Serologys[index].SerologyResult = "'AB' (+ve)";

    };
    $scope.OnPressHormoneF8 = function (data) {
        var index = $scope.Serologys.indexOf(data);
        $scope.Serologys[index].SerologyResult = "'AB' (-ve)";

    };
    $scope.OnPressHormoneF9 = function (data) {
        var index = $scope.Serologys.indexOf(data);
        $scope.Serologys[index].SerologyResult = "'O' (+ve)";

    };
    $scope.OnPressHormoneF10 = function (data) {
        var index = $scope.Serologys.indexOf(data);
        $scope.Serologys[index].SerologyResult = "'O' (-ve)";

    };
    $scope.OnPressHormoneCtrl_q = function (data) {
        var index = $scope.Serologys.indexOf(data);
        $scope.Serologys[index].SerologyResult = "Positive";

    };
    $scope.OnPressHormoneAlt = function (data) {
        var index = $scope.Serologys.indexOf(data);
        $scope.Serologys[index].SerologyResult = "Negative";
    };

    // Save Hormone.
    $scope.SaveHormone = function () {
        if ($scope.Hormones != 0) {
            if ($scope.Hormone.Id == 0 || $scope.Hormone.Id > 0) {
                var url = "SaveHormone";
                if ($scope.Hormone.Id > 0) {
                    url = "UpdateHormone";
                }
                //For Adding Specimen.
                angular.forEach($scope.Hormones, function (item) { 
                    var specimen = $scope.ImmuSpecimen || null;
                    if (specimen != null) {
                        item.Specimen = $scope.ImmuSpecimen;
                    }
                });

                if ($scope.CompanyName == "Prime Hospital Ltd.") {
                    //$scope.ImmunooConsultantt = 1;
                }

                //For Adding Pathologist Id.
                var isHormoneResultBlank = false;
                var BlankHormoneTestName = "";
                debugger;
                angular.forEach($scope.Hormones, function (item) {
                    var consultant = $scope.ImmunooConsultantt || null;
                    if (consultant != null) {
                        item.PathologistId = $scope.ImmunooConsultantt;
                    }
                    if (consultant == null) {
                        item.PathologistId = null;
                    }

                    if ($scope.ImmunoPathologistSearchtwo != undefined) {
                        item.PathologistId2 = $scope.ImmunoPathologistSearchtwo;
                    }
                    if ($scope.ImmunoPathologistSearchthree != undefined) {
                        item.PathologistId3 = $scope.ImmunoPathologistSearchthree;
                    }

                    if (item.HormoneResult == "" || item.HormoneResult == null) {
                        isHormoneResultBlank = true;
                        BlankHormoneTestName += item.ParticularName + ", ";
                    }

                    item.SpecimenNote = $scope.ImmunologySpecimenNote;
                    if ($scope.SelectedImmunologyAnalyzerId > 0 && $scope.ImmunologyAnalyzer != null) {
                        item.AnalyzerId = $scope.SelectedImmunologyAnalyzerId;
                    }
                    else if ($scope.ImmunologyAnalyzer == null) {
                        item.AnalyzerId = null;
                    }
                    else {
                        item.AnalyzerId = $scope.ImmunologyAnalyzerId;
                    }

                    ///
                    if ($scope.SelectedImmunologyCheckedBySignId > 0 && $scope.ImmunologyCheckedBy != null) {
                        item.CheckedBySignId = $scope.SelectedImmunologyCheckedBySignId;
                    }
                    else if ($scope.ImmunologyCheckedBy == null) {
                        item.CheckedBySignId = null;
                    }

                    ///
                    if ($scope.SelectedImmunologyMedicalTechologistSignId > 0 && $scope.ImmunologyMedicalTechologistBy != null) {
                        item.MedicalTechologistSignId = $scope.SelectedImmunologyMedicalTechologistSignId;
                    }
                    else if ($scope.ImmunologyMedicalTechologistBy == null) {
                        item.MedicalTechologistSignId = null;
                    }
                });

                if (isHormoneResultBlank == true) {
                    if (confirm(BlankHormoneTestName + "  value is blank. do you want to save without it ?") == true) {

                    }
                    else {
                        return;
                    }
                }
                debugger;
                $scope.saveButtonDisable = true;
                $http({
                    method: "POST",
                    url: url,
                    //data: $scope.LisPatient.LisHematologys,
                    data: { testHormoneResult: $scope.Hormones, pdtDate: $scope.TestOrderIdLoadDate, testOrderId: $scope.TestOrdId, Specimen: $scope.ImmunologySpeciman, remarks: $scope.LisPatient.ImmunologyRemarks }
                }).success(function mySucces(response) {
                    if (response.Success) {
                        if (response.PrimaryId != 0) {//new added
                            $scope.Hormone.Id = 1;
                        }
                        else {
                            $scope.Hormone.Id = 0;
                        }
                        $scope.IsClickedHormone = 2;
                        //$scope.Hormones = [];
                        $scope.submitted = false;
                        $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
                        $scope.GetHormoneById();
                    }
                    else {
                        $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
                    }
                    $scope.saveButtonDisable = false;
                }).error(function myError(response) {
                    $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
                    $scope.saveButtonDisable = false;
                });
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.lisDCAlert });
            }
        }
        else {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.detailItem });
        }
    };

    // Update Hormone
    $scope.UpdateHormone = function () {
        $http({
            method: "POST",
            url: "UpdateHormone",
            data: { testHormoneResult: $scope.Hormones, pdtDate: $scope.TestOrderIdLoadDate, testOrderId: $scope.TestOrdId }
            //data: $scope.ComponentPreparation

        }).success(function mySucces(response) {
            if (response) {
                //$scope.LisPatient.Id = response.Id;
                $scope.submitted = false;
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.update });
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            }
        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };

    $scope.GetMicroBios = function () {
        $scope.MicroBios = [];
        if ($scope.MicroBoiDetail != "" && $scope.MicroBoiDetail != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail,
                'MatchIdentity': 0
            });
        }
        if ($scope.MicroBoiDetail1 != "" && $scope.MicroBoiDetail1 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail1,
                'MatchIdentity': 1
            });
        }

        if ($scope.MicroBoiDetail2 != "" && $scope.MicroBoiDetail2 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail2,
                'MatchIdentity': 2
            });
        }

        if ($scope.MicroBoiDetail3 != "" && $scope.MicroBoiDetail3 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail3,
                'MatchIdentity': 3
            });
        }

        if ($scope.MicroBoiDetail4 != "" && $scope.MicroBoiDetail4 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail4,
                'MatchIdentity': 4
            });
        }

        if ($scope.MicroBoiDetail5 != "" && $scope.MicroBoiDetail5 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail5,
                'MatchIdentity': 5
            });
        }

        if ($scope.MicroBoiDetail6 != "" && $scope.MicroBoiDetail6 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail6,
                'MatchIdentity': 6
            });
        }

        if ($scope.MicroBoiDetail7 != "" && $scope.MicroBoiDetail7 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail7,
                'MatchIdentity': 7
            });
        }

        if ($scope.MicroBoiDetail8 != "" && $scope.MicroBoiDetail8 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail8,
                'MatchIdentity': 8
            });
        }

        if ($scope.MicroBoiDetail9 != "" && $scope.MicroBoiDetail9 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail9,
                'MatchIdentity': 9
            });
        }

        if ($scope.MicroBoiDetail10 != "" && $scope.MicroBoiDetail10 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail10,
                'MatchIdentity': 10
            });
        }

        if ($scope.MicroBoiDetail11 != "" && $scope.MicroBoiDetail11 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail11,
                'MatchIdentity': 11
            });
        }

        if ($scope.MicroBoiDetail12 != "" && $scope.MicroBoiDetail12 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail12,
                'MatchIdentity': 12
            });
        }

        if ($scope.MicroBoiDetail13 != "" && $scope.MicroBoiDetail13 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail13,
                'MatchIdentity': 13
            });
        }

        if ($scope.MicroBoiDetail14 != "" && $scope.MicroBoiDetail14 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail14,
                'MatchIdentity': 14
            });
        }

        if ($scope.MicroBoiDetail15 != "" && $scope.MicroBoiDetail15 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail15,
                'MatchIdentity': 15
            });
        }

        if ($scope.MicroBoiDetail16 != "" && $scope.MicroBoiDetail16 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail16,
                'MatchIdentity': 16
            });
        }

        if ($scope.MicroBoiDetail17 != "" && $scope.MicroBoiDetail17 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail17,
                'MatchIdentity': 17
            });
        }

        if ($scope.MicroBoiDetail18 != "" && $scope.MicroBoiDetail18 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail18,
                'MatchIdentity': 18
            });
        }

        if ($scope.MicroBoiDetail19 != "" && $scope.MicroBoiDetail19 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail19,
                'MatchIdentity': 19
            });
        }

        if ($scope.MicroBoiDetail20 != "" && $scope.MicroBoiDetail20 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail20,
                'MatchIdentity': 20
            });
        }

        if ($scope.MicroBoiDetail21 != "" && $scope.MicroBoiDetail21 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail21,
                'MatchIdentity': 21
            });
        }

        if ($scope.MicroBoiDetail22 != "" && $scope.MicroBoiDetail22 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail22,
                'MatchIdentity': 22
            });
        }

        if ($scope.MicroBoiDetail23 != "" && $scope.MicroBoiDetail23 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail23,
                'MatchIdentity': 23
            });
        }

        if ($scope.MicroBoiDetail24 != "" && $scope.MicroBoiDetail24 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail24,
                'MatchIdentity': 24
            });
        }

        if ($scope.MicroBoiDetail25 != "" && $scope.MicroBoiDetail25 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail25,
                'MatchIdentity': 25
            });
        }

        if ($scope.MicroBoiDetail26 != "" && $scope.MicroBoiDetail26 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail26,
                'MatchIdentity': 26
            });
        }

        if ($scope.MicroBoiDetail27 != "" && $scope.MicroBoiDetail27 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail27,
                'MatchIdentity': 27
            });
        }

        if ($scope.MicroBoiDetail28 != "" && $scope.MicroBoiDetail28 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail28,
                'MatchIdentity': 28
            });
        }

        if ($scope.MicroBoiDetail29 != "" && $scope.MicroBoiDetail29 != null) {
            $scope.MicroBios.push({
                'TestParticular': $scope.MicroBoiDetail29,
                'MatchIdentity': 29
            });
        }
    }

    // Save Micro biology
    $scope.SaveMicroBiology = function () {
        if ($scope.TestId == 0 || $scope.TestId == null) {
            $scope.alerts.push({ 'type': 'danger', 'msg': 'Data Saved Faild you need to select Test Id.' });
            return;
        }
        $scope.GetMicroBios();

        if ($scope.MicroBios != 0 || $scope.MicroBios == 0) {
            //if ($scope.LisPatient.Id == 0 || $scope.LisPatient.Id > 0) {
            if ($scope.MicroBio.Id == 0 || $scope.MicroBio.Id > 0) {

                var url = "SaveMicroBiology";
                if ($scope.MicroBio.Id > 0) {
                    url = "UpdateMicroBiology";
                }
                //For Adding Specimen.
                angular.forEach($scope.MicroBios, function (item) {
                    var specimen = $scope.MicroBioSpecimen || null;
                    if (specimen != null) {
                        item.Specimen = $scope.MicroBioSpecimen;
                    }

                    item.SpecimenNote = $scope.MicrobiologySpecimenNote;
                    if ($scope.SelectedMicrobiologyAnalyzerId > 0 && $scope.MicrobiologyAnalyzer != null) {
                        item.AnalyzerId = $scope.SelectedMicrobiologyAnalyzerId;
                    }
                    else if ($scope.MicrobiologyAnalyzer == null) {
                        item.AnalyzerId = null;
                    }
                    else {
                        item.AnalyzerId = $scope.MicrobiologyAnalyzerId;
                    }

                    ///
                    if ($scope.SelectedMicrobiologyCheckedBySignId > 0 && $scope.MicrobiologyCheckedBy != null) {
                        item.CheckedBySignId = $scope.SelectedMicrobiologyCheckedBySignId;
                    }
                    else if ($scope.MicrobiologyCheckedBy == null) {
                        item.CheckedBySignId = null;
                    }

                    ///
                    if ($scope.SelectedMicrobiologyMedicalTechologistSignId > 0 && $scope.MicrobiologyMedicalTechologistBy != null) {
                        item.MedicalTechologistSignId = $scope.SelectedMicrobiologyMedicalTechologistSignId;
                    }
                    else if ($scope.MicrobiologyMedicalTechologistBy == null) {
                        item.MedicalTechologistSignId = null;
                    }
                });

                if ($scope.CompanyName == "Prime Hospital Ltd.") {
                    //$scope.MicroBioConsultantt = 1;
                }                

                //For Adding InhibDiameter(starts)...
                angular.forEach($scope.MicroBios, function (item) {

                    var diameter1 = $scope.Diameter1 || null;
                    var diameter2 = $scope.Diameter2 || null;
                    var diameter3 = $scope.Diameter3 || null;
                    var diameter4 = $scope.Diameter4 || null;
                    var diameter5 = $scope.Diameter5 || null;
                    var diameter6 = $scope.Diameter6 || null;
                    var diameter7 = $scope.Diameter7 || null;
                    var diameter8 = $scope.Diameter8 || null;
                    var diameter9 = $scope.Diameter9 || null;
                    var diameter10 = $scope.Diameter10 || null;

                    var diameter11 = $scope.Diameter11 || null;
                    var diameter12 = $scope.Diameter12 || null;
                    var diameter13 = $scope.Diameter13 || null;
                    var diameter14 = $scope.Diameter14 || null;
                    var diameter15 = $scope.Diameter15 || null;
                    var diameter16 = $scope.Diameter16 || null;
                    var diameter17 = $scope.Diameter17 || null;
                    var diameter18 = $scope.Diameter18 || null;
                    var diameter19 = $scope.Diameter19 || null;
                    var diameter20 = $scope.Diameter20 || null;

                    var diameter21 = $scope.Diameter21 || null;
                    var diameter22 = $scope.Diameter22 || null;
                    var diameter23 = $scope.Diameter23 || null;
                    var diameter24 = $scope.Diameter24 || null;
                    var diameter25 = $scope.Diameter25 || null;
                    var diameter26 = $scope.Diameter26 || null;
                    var diameter27 = $scope.Diameter27 || null;
                    var diameter28 = $scope.Diameter28 || null;
                    var diameter29 = $scope.Diameter29 || null;
                    var diameter30 = $scope.Diameter30 || null;

                    if (diameter1 != null && item.MatchIdentity == 0) {
                        item.InhibDiam = $scope.Diameter1;
                    }
                    if (diameter2 != null && item.MatchIdentity == 1) {
                        item.InhibDiam = $scope.Diameter2;
                    }
                    if (diameter3 != null && item.MatchIdentity == 2) {
                        item.InhibDiam = $scope.Diameter3;
                    }
                    if (diameter4 != null && item.MatchIdentity == 3) {
                        item.InhibDiam = $scope.Diameter4;
                    }
                    if (diameter5 != null && item.MatchIdentity == 4) {
                        item.InhibDiam = $scope.Diameter5;
                    }
                    if (diameter6 != null && item.MatchIdentity == 5) {
                        item.InhibDiam = $scope.Diameter6;
                    }
                    if (diameter7 != null && item.MatchIdentity == 6) {
                        item.InhibDiam = $scope.Diameter7;
                    }
                    if (diameter8 != null && item.MatchIdentity == 7) {
                        item.InhibDiam = $scope.Diameter8;
                    }
                    if (diameter9 != null && item.MatchIdentity == 8) {
                        item.InhibDiam = $scope.Diameter9;
                    }
                    if (diameter10 != null && item.MatchIdentity == 9) {
                        item.InhibDiam = $scope.Diameter10;
                    }


                    if (diameter11 != null && item.MatchIdentity == 10) {
                        item.InhibDiam = $scope.Diameter11;
                    }
                    if (diameter12 != null && item.MatchIdentity == 11) {
                        item.InhibDiam = $scope.Diameter12;
                    }
                    if (diameter13 != null && item.MatchIdentity == 12) {
                        item.InhibDiam = $scope.Diameter13;
                    }
                    if (diameter14 != null && item.MatchIdentity == 13) {
                        item.InhibDiam = $scope.Diameter14;
                    }
                    if (diameter15 != null && item.MatchIdentity == 14) {
                        item.InhibDiam = $scope.Diameter15;
                    }
                    if (diameter16 != null && item.MatchIdentity == 15) {
                        item.InhibDiam = $scope.Diameter16;
                    }
                    if (diameter17 != null && item.MatchIdentity == 16) {
                        item.InhibDiam = $scope.Diameter17;
                    }
                    if (diameter18 != null && item.MatchIdentity == 17) {
                        item.InhibDiam = $scope.Diameter18;
                    }
                    if (diameter19 != null && item.MatchIdentity == 18) {
                        item.InhibDiam = $scope.Diameter19;
                    }
                    if (diameter20 != null && item.MatchIdentity == 19) {
                        item.InhibDiam = $scope.Diameter20;
                    }

                    if (diameter21 != null && item.MatchIdentity == 20) {
                        item.InhibDiam = $scope.Diameter21;
                    }
                    if (diameter22 != null && item.MatchIdentity == 21) {
                        item.InhibDiam = $scope.Diameter22;
                    }
                    if (diameter23 != null && item.MatchIdentity == 22) {
                        item.InhibDiam = $scope.Diameter23;
                    }
                    if (diameter24 != null && item.MatchIdentity == 23) {
                        item.InhibDiam = $scope.Diameter24;
                    }
                    if (diameter25 != null && item.MatchIdentity == 24) {
                        item.InhibDiam = $scope.Diameter25;
                    }
                    if (diameter26 != null && item.MatchIdentity == 25) {
                        item.InhibDiam = $scope.Diameter26;
                    }
                    if (diameter27 != null && item.MatchIdentity == 26) {
                        item.InhibDiam = $scope.Diameter27;
                    }
                    if (diameter28 != null && item.MatchIdentity == 27) {
                        item.InhibDiam = $scope.Diameter28;
                    }
                    if (diameter29 != null && item.MatchIdentity == 28) {
                        item.InhibDiam = $scope.Diameter29;
                    }
                    if (diameter30 != null && item.MatchIdentity == 29) {
                        item.InhibDiam = $scope.Diameter30;
                    }

                    //else {
                    //    $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });
                    //}
                });
                //For Adding InhibDiameter(Ends)...


                //=============================================================
                if ($scope.MicroBios == 0) {
                    $scope.MicroBioSpecimenNote = $scope.MicrobiologySpecimenNote;
                    if ($scope.SelectedMicrobiologyAnalyzerId > 0) {
                        $scope.MicroBioAnalyzerId = $scope.SelectedMicrobiologyAnalyzerId;
                    }
                    else {
                        $scope.MicroBioAnalyzerId = $scope.MicrobiologyAnalyzerId;
                    }

                    ///
                    if ($scope.SelectedMicrobiologyCheckedBySignId > 0 && $scope.MicrobiologyCheckedBy != null) {
                        $scope.CheckedBySignId = $scope.SelectedMicrobiologyCheckedBySignId;
                    }
                    else if ($scope.MicrobiologyCheckedBy == null) {
                        $scope.CheckedBySignId = null;
                    }

                    ///
                    if ($scope.SelectedMicrobiologyMedicalTechologistSignId > 0 && $scope.MicrobiologyMedicalTechologistBy != null) {
                        $scope.MedicalTechologistSignId = $scope.SelectedMicrobiologyMedicalTechologistSignId;
                    }
                    else if ($scope.MicrobiologyMedicalTechologistBy == null) {
                        $scope.MedicalTechologistSignId = null;
                    }

                    $scope.MicroBios.push({
                        'Specimen': $scope.MicroBioSpecimen,
                        'PathologistId': $scope.MicroBioConsultantt,
                        'MatchIdentity': 1010,
                        'AnalyzerId': $scope.MicroBioAnalyzerId,
                        'SpecimenNote': $scope.MicroBioSpecimenNote,
                        'CheckedBySignId': $scope.CheckedBySignId,
                        'MedicalTechologistSignId': $scope.MedicalTechologistSignId,

                    })

                    $scope.Interpritations.push({

                        'MatchIdentity': 1010
                    });

                   
                }

                if ($scope.MicroBio.Id > 0) {
                    $scope.CulturalArray = [];
                    $scope.CulturalArray.push({
                        'MediaUsed': $scope.Culture.MediaUsed,
                        'CultureResult': $scope.Culture.CultureResult,
                        'IsBm': $scope.Culture.IsBm,
                        'HasGrowth': $scope.Culture.HasGrowth,
                        'GrowthType': $scope.Culture.GrowthType,

                        //'OrganismIsolated': $scope.Culture.OrganismIsolated,
                        'OrganismIsolatedA': $scope.Culture.OrganismIsolatedA,
                        'OrganismIsolatedB': $scope.Culture.OrganismIsolatedB,
                        'OrganismIsolatedC': $scope.Culture.OrganismIsolatedC,
                        'PusCells': $scope.Culture.PusCells1,
                        'EpithelialCells': $scope.Culture.EpithelialCells1,
                        'RBC': $scope.Culture.RbC1,
                        'TestId': $scope.TestId,

                        'ColonyCount': $scope.Culture.ColonyCount,
                        'Incubation': $scope.Culture.Incubation,
                        'NonGrowthBloodCsMassage': $scope.BloodCs,
                        'MediaUsedA': $scope.MediaUsedA == true ? "Blood Agar." : null,
                        'MediaUsedB': $scope.MediaUsedB == true ? "MacConkey's Agar." : null,
                        'MediaUsedC': $scope.MediaUsedC == true ? "Chocolate Agar." : null,
						'MediaUsedD': $scope.MediaUsedD == true ? "SS Agar." : null,
						'MediaUsedE': $scope.MediaUsedE == true ? "CLED Agar." : null,
                    })
                }
                //==============================================================
				debugger;
                //For Adding Pathologist Id.
                angular.forEach($scope.MicroBios, function (item) {
                    var consultant = $scope.MicroBioConsultantt || null;
                    if (consultant != null) {
                        item.PathologistId = $scope.MicroBioConsultantt;
                    }
                    if ($scope.MicroBiologyPathologistSearchtwo != undefined) {
                        debugger;
                        consultant = $scope.MicroBiologyPathologistSearchtwo || null;
                        if (consultant != null) {
                            item.PathologistId2 = $scope.MicroBiologyPathologistSearchtwo;
                        }
                    }
                    if ($scope.MicroBiologyPathologistSearchthree != undefined) {
                        debugger;
                        consultant = $scope.MicroBiologyPathologistSearchthree || null;
                        if (consultant != null) {
                            item.PathologistId3 = $scope.MicroBiologyPathologistSearchthree;
                        }
                    }
                });               
               


                $http({
                    method: "POST",
                    url: url,
                    //data: $scope.LisPatient.LisHematologys,
                    data: { testMicroBoiResult: $scope.MicroBios, Specimen: $scope.MicrobiologySpeciman, testMicroBoiInterpretation: $scope.Interpritations, pdtDate: $scope.TestOrderIdLoadDate, testOrderId: $scope.TestOrdId, TestId: $scope.TestId, cultureRes: $scope.CulturalArray, remarks: $scope.LisPatient.MicrobiologyRemarks }
                }).success(function mySucces(response) {
					debugger;
                    if (response.Success) {
                        $scope.IsClickedMicrobiology = 2;
                       // $scope.SaveMicroBioCulture(); // Calling SaveMicroBioCulture function.

                        if (response.PrimaryId != 0) {//new added
                            $scope.MicroBio.Id = 1;
                        }
                        else {
                            $scope.MicroBio.Id = 0;
                        }
                        //$scope.LisPatient.Id = response.Id;
                        //$scope.BioChemicalResults = [];

                        $scope.submitted = false;
                        $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
                        //$scope.GetMicroBioById();
                    }
                    else {
                        $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
                    }
                }).error(function myError(response) {
                    $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
                });
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.lisDCAlert });
            }
        }
        else {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.detailItem });
        }
    };


    // Save Micro biology Culture Result
    $scope.SaveMicroBioCulture = function () {
        if ($scope.MicroBios != 0 || $scope.MicroBios == 0) {
            //if ($scope.LisPatient.Id == 0 || $scope.LisPatient.Id > 0) {
            if ($scope.MicroBio.Id == 0 || $scope.MicroBio.Id > 0) {
                var url = "SaveMicroBioCulture";
                if ($scope.MicroBio.Id > 0) {
                    url = "UpdateMicroBioCulture";
                }

                $http({
                    method: "POST",
                    url: url,
                    //data: $scope.LisPatient.LisHematologys,
                    data: { cultureRes: $scope.Culture, pdtDate: $scope.TestOrderIdLoadDate, testOrderId: $scope.TestOrdId, testId : $scope.TestId }
                }).success(function mySucces(response) {

                    if (response.Success) {

                        if (response.PrimaryId != 0) {//new added
                            $scope.MicroBio.Id = 1;
                        }
                        else {
                            $scope.MicroBio.Id = 0;
                        }

                        //$scope.LisPatient.Id = response.Id;
                        //$scope.BioChemicalResults = [];
                        $scope.submitted = false;
                        $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });

                    }
                    else {
                        $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
                    }
                }).error(function myError(response) {
                    //$scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
                });
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.lisDCAlert });
            }
        }
        else {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.detailItem });
        }
    };

    // Update MicroBoilogy
    $scope.UpdateMicroBiology = function () {
        $http({
            method: "POST",
            url: "UpdateMicroBiology",
            data: { testMicroBoiResult: $scope.MicroBios, testMicroBoiInterpretation: $scope.Interpritations, pdtDate: $scope.TestOrderIdLoadDate, testOrderId: $scope.TestOrdId, cultureRes: $scope.Culture }
            //data: $scope.ComponentPreparation

        }).success(function mySucces(response) {
            if (response) {
                //$scope.UpdateMicroBioCulture(); // Calling SaveMicroBioCulture function.
                //$scope.LisPatient.Id = response.Id;
                $scope.submitted = false;
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.update });
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            }
        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };
    // Update MicroBoilogy Culture Result(Not Needed Now, If needed then i will work for it)
    $scope.UpdateMicroBioCulture = function () {

        $http({
            method: "POST",
            url: "UpdateMicroBioCulture",
            data: { testMicroBoiResult: $scope.MicroBios, testMicroBoiInterpretation: $scope.Interpritations, pdtDate: $scope.LisPatient.pdt, testOrderId: $scope.TestOrdId }
        }).success(function mySucces(response) {
            if (response) {
                //$scope.LisPatient.Id = response.Id;
                $scope.submitted = false;
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.update });
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            }
        }).error(function myError(response) {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    };
    //// Details validation Test
    //$scope.DetailsValidation = function () {
    //    if ($scope.InvoiceChallanDetail.Quantity > 0 && $scope.InvoiceChallanDetail.Quantity <= $scope.InvoiceChallanDetail.StockQuantity) {
    //        var removeRed = $('.detailsValidation').removeClass('validation-error');
    //        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    //        var addGreen = $('.detailsValidation').addClass('validation-success');
    //    }
    //    else {
    //        var removeGreen = $('.detailsValidation').removeClass('validation-success');
    //        var removeRed = $('.detailsValidation').removeClass('ng-dirty');
    //        var addRed = $('.detailsValidation').addClass('validation-error');
    //    }
    //}

    // For Approved Status(Starts)........
    $scope.ApprovedLisBioChemReportResult = function (testGroup) {
        var orderId = $scope.TestOrdId || null;
        var emptyLab = 0;

        if ($scope.BioChemicalResults.length != 0) {
            angular.forEach($scope.BioChemicalResults, function (item) {
                var result = item.TestResult || null;
                if (result != null) {
                    emptyLab = 1;
                }
            });
        }
        else {
            emptyLab = 0;
        }

        var CheckedById = $scope.BioChemCheckedBySignId || null;
        var MedicalTechologistById = $scope.BioChemMedicalTechologistSignId || null;

        if ($scope.CompanyName == "INSAF BARAKAH KIDNEY & GENERAL HOSPITAL") {
            if (CheckedById == null || MedicalTechologistById == null) {
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Please select the CheckedBy and MedicalTechologistBy' });
                return;
            }
        }

        if (orderId != null && emptyLab != 0) {
            $http({
                method: "POST",
                url: "/LIS/Haematology/ApprovedLisBioChemReportResult",
                data: { testOrderNo: orderId, testGroupId: testGroup }
            }).success(function (response) {
                if (response.Success == true) {

                    $scope.IsClickedBioChemical = 3; //
                    $scope.BioPrintStatus = response.approvalPrintStatus;

                    $scope.alerts.push({ 'type': 'success', 'msg': 'Approved successfully' });
                }
            }).error(function (response) {
                $scope.alerts.push({ 'type': 'info', 'msg': 'Approved failed' });
            });
        }
        else {
            $scope.alerts.push({ 'type': 'info', 'msg': 'There is no lab report result' });
            $window.scrollTo(0, 0);
            return;
        }
    };

    $scope.ApprovedLisSerologyReportResult = function (testGroup) {
        var orderId = $scope.TestOrdId || null;
        var emptyLab = 0;

        if ($scope.Serologys.length != 0) {
            angular.forEach($scope.Serologys, function (item) {
                var result = item.SerologyResult || null;
                if (result != null) {
                    emptyLab = 1;
                }
            });
        }
        else {
            emptyLab = 0;
        }

        var CheckedById = $scope.SerologyCheckedBySignId || null;
        var MedicalTechologistById = $scope.SerologyMedicalTechologistSignId || null;

        if ($scope.CompanyName == "INSAF BARAKAH KIDNEY & GENERAL HOSPITAL") {
            if (CheckedById == null || MedicalTechologistById == null) {
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Please select the CheckedBy and MedicalTechologistBy' });
                return;
            }
        }

        if (orderId != null && emptyLab != 0) {
            $http({
                method: "POST",
                url: "/LIS/Haematology/ApprovedLisSerologyReportResult",
                data: { testOrderNo: orderId, testGroupId: testGroup }
            }).success(function (response) {
                if (response.Success == true) {
                    $scope.SeroPrintStatus = response.approvalPrintStatus; // new added
                    $scope.IsClickedSerology = 3;
                    $scope.alerts.push({ 'type': 'success', 'msg': 'Approved successfully' });
                }
            }).error(function (response) {
                $scope.alerts.push({ 'type': 'info', 'msg': 'Approved failed' });
            });
        }
        else {
            $scope.alerts.push({ 'type': 'info', 'msg': 'There is no lab report result' });
            $window.scrollTo(0, 0);
            return;
        }
    };

    $scope.ApprovedLisImmunologyReportResult = function (testGroup) {
        var orderId = $scope.TestOrdId || null;
        var emptyLab = 0;

        if ($scope.Hormones.length != 0) {
            angular.forEach($scope.Hormones, function (item) {
                var result = item.HormoneResult || null;
                if (result != null) {
                    emptyLab = 1;
                }
            });
        }
        else {
            emptyLab = 0;
        }

        var CheckedById = $scope.ImmunologyCheckedBySignId || null;
        var MedicalTechologistById = $scope.ImmunologyMedicalTechologistSignId || null;

        if ($scope.CompanyName == "INSAF BARAKAH KIDNEY & GENERAL HOSPITAL") {
            if (CheckedById == null || MedicalTechologistById == null) {
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Please select the CheckedBy and MedicalTechologistBy' });
                return;
            }
        }

        if (orderId != null && emptyLab != 0) {
            $http({
                method: "POST",
                url: "/LIS/Haematology/ApprovedLisImmunologyReportResult",
                data: { testOrderNo: orderId, testGroupId: testGroup }
            }).success(function (response) {
                if (response.Success == true) {
                    $scope.ImmunoPrintStatus = response.approvalPrintStatus; // new added
                    $scope.IsClickedHormone = 3; //
                    $scope.alerts.push({ 'type': 'success', 'msg': 'Approved successfully' });
                }
            }).error(function (response) {
                $scope.alerts.push({ 'type': 'info', 'msg': 'Approved failed' });
            });
        }
        else {
            $scope.alerts.push({ 'type': 'info', 'msg': 'There is no lab report result' });
            $window.scrollTo(0, 0);
            return;
        }
    };

    $scope.ApprovedLisHematologyReportResult = function (testGroup) {
        var orderId = $scope.TestOrdId || null;
        var emptyLab = 0;

        if ($scope.LisPatient.LisHematologys.length != 0) {
            angular.forEach($scope.LisPatient.LisHematologys, function (item) {
                var result = item.TestResult || null;
                if (result != null) {
                    emptyLab = 1;
                }
            });
        }
        else {
            emptyLab = 0;
        }

        var HematoCheckedById = $scope.HematologyCheckedBySignId || null;
        var HematoMedicalTechologistById = $scope.HematologyMedicalTechologistSignId || null;

        if ($scope.CompanyName == "INSAF BARAKAH KIDNEY & GENERAL HOSPITAL") {
            if (HematoCheckedById == null || HematoMedicalTechologistById == null) {
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Please select the CheckedBy and MedicalTechologistBy' });
                return;
            }
        }
        
        if (orderId != null && emptyLab != 0) {
            $http({
                method: "POST",
                url: "/LIS/Haematology/ApprovedLisHematologyReportResult",
                data: { testOrderNo: orderId, testGroupId: testGroup }
            }).success(function (response) {
                if (response.Success == true) {
                    $scope.HematologyPrintStatus = response.approvalPrintStatus; // new added
                    $scope.IsClickedHeamatology = 3;
                    $scope.alerts.push({ 'type': 'success', 'msg': 'Approved successfully' });
                }
            }).error(function (response) {
                $scope.alerts.push({ 'type': 'info', 'msg': 'Approved failed' });
            });
        }
        else {
            $scope.alerts.push({ 'type': 'info', 'msg': 'There is no lab report result' });
            $window.scrollTo(0, 0);
            return;
        }
    };

    $scope.ApprovedLisMicroBiologyReportResult = function (testGroup) {
        var orderId = $scope.TestOrdId || null;
        var emptyLab = 0;

        if ($scope.MicroBios.length != 0) {
            angular.forEach($scope.MicroBios, function (item) {
                var result = item.TestParticular || null;
                if (result != null) {
                    emptyLab = 1;
                }
            });
        }
        else {
            emptyLab = 0;
        }

        var CheckedById = $scope.MicrobiologyCheckedBySignId || null;
        var MedicalTechologistById = $scope.MicrobiologyMedicalTechologistSignId || null;

        if ($scope.CompanyName == "INSAF BARAKAH KIDNEY & GENERAL HOSPITAL") {
            if (CheckedById == null || MedicalTechologistById == null) {
                $scope.alerts.push({ 'type': 'danger', 'msg': 'Please select the CheckedBy and MedicalTechologistBy' });
                return;
            }
        }

        if (orderId != null && $scope.TestId > 0) {
            $http({
                method: "POST",
                url: "/LIS/Haematology/ApprovedLisMicroBiologyReportResult",
                data: { testOrderNo: orderId, testGroupId: testGroup, testId: $scope.TestId }
            }).success(function (response) {
                if (response.Success == true) {
                    $scope.MicroBiologyPrintStatus = response.approvalPrintStatus; // new added
                    $scope.IsClickedMicrobiology = 3;
                    $scope.alerts.push({ 'type': 'success', 'msg': 'Approved successfully' });
                }
            }).error(function (response) {
                $scope.alerts.push({ 'type': 'info', 'msg': 'Approved failed' });
            });
        }
        else {
            $scope.alerts.push({ 'type': 'info', 'msg': 'There is no lab report result' });
            $window.scrollTo(0, 0);
            return;
        }
    };
    // For Approved Status(Ends)........


    $scope.onTabClicked = function (tab) {
        switch (tab) {
            case "Haematology":
                $scope.activeTab = tab;
                $scope.activeTabPathologistId = $scope.HematoPathologist.Id;
                $scope.topHeadValue = "";
                break;
            case "BioChemistry":
                $scope.activeTab = tab;
                $scope.activeTabPathologistId = $scope.BioChemicalPathologist.Id;
                $scope.topHeadValue = "";
                break;
            case "Serology":
                $scope.activeTab = tab;
                $scope.activeTabPathologistId = $scope.seroPathologist.Id;
                $scope.topHeadValue = "";
                break;
            case "Immunology":
                $scope.activeTab = tab;
                $scope.activeTabPathologistId = $scope.ImmunoPathologist.Id;
                $scope.topHeadValue = "";
                break;
            case "Urine":
                $scope.activeTab = tab;
                $scope.activeTabPathologistId = $scope.UrinPathologist.Id;
                $scope.topHeadValue = "";
                break;
            case "Stool":
                $scope.activeTab = tab;
                $scope.activeTabPathologistId = $scope.StoolPathologist.Id;
                $scope.topHeadValue = "";
                break;
            case "LabReport":
                $scope.activeTab = tab;
                $scope.activeTabPathologistId = $scope.LabPathologist.Id;
                if ($scope.LabReportTopHeading != null) {
                    $scope.topHeadValue = $scope.LabReportTopHeading;
                }
                break;
            case "Microbiology":
                $scope.activeTab = tab;
                $scope.activeTabPathologistId = $scope.MicroBiologyPathologist.Id;
                $scope.topHeadValue = "";
                break;
            case "HistoPathology":
                $scope.activeTab = tab;
                $scope.activeTabPathologistId = $scope.MicroBiologyPathologist.Id;
                $scope.topHeadValue = "";
                break;
        }

    }

    //line 1979
    $scope.printTop = function () {
        switch ($scope.activeTab) {
            case "Haematology":
                $scope.activeTabPathologistId = $scope.HematoPathologist.Id;
                $scope.CheckedById = null;
                $scope.MedicalTechologistId = null;
                if ($scope.HematoCheckedBy != null && $scope.HematoCheckedBy != undefined) {
                    $scope.CheckedById = $scope.HematoCheckedBy.Id;
                }
                if ($scope.HematoMedicalTechologistBy != null && $scope.HematoMedicalTechologistBy != undefined) {
                    $scope.MedicalTechologistId = $scope.HematoMedicalTechologistBy.Id;
                }

                break;
            case "BioChemistry":
                $scope.activeTabPathologistId = $scope.BioChemicalPathologist.Id;
                $scope.CheckedById = null;
                $scope.MedicalTechologistId = null;
                if ($scope.BioChemCheckedBy != null && $scope.BioChemCheckedBy != undefined) {
                    $scope.CheckedById = $scope.BioChemCheckedBy.Id;
                }
                if ($scope.BioChemMedicalTechologistBy != null && $scope.BioChemMedicalTechologistBy != undefined) {
                    $scope.MedicalTechologistId = $scope.BioChemMedicalTechologistBy.Id;
                }

                break;
            case "Serology":
                $scope.activeTabPathologistId = $scope.seroPathologist.Id;
                $scope.CheckedById = null;
                $scope.MedicalTechologistId = null;
                if ($scope.SerologyCheckedBy != null && $scope.SerologyCheckedBy != undefined) {
                    $scope.CheckedById = $scope.SerologyCheckedBy.Id;
                }
                if ($scope.SerologyMedicalTechologistBy != null && $scope.SerologyMedicalTechologistBy != undefined) {
                    $scope.MedicalTechologistId = $scope.SerologyMedicalTechologistBy.Id;
                }

                break;
            case "Immunology":
                $scope.activeTabPathologistId = $scope.ImmunoPathologist.Id;
                $scope.CheckedById = null;
                $scope.MedicalTechologistId = null;
                if ($scope.ImmunologyCheckedBy != null && $scope.ImmunologyCheckedBy != undefined) {
                    $scope.CheckedById = $scope.ImmunologyCheckedBy.Id;
                }
                if ($scope.ImmunologyMedicalTechologistBy != null && $scope.ImmunologyMedicalTechologistBy != undefined) {
                    $scope.MedicalTechologistId = $scope.ImmunologyMedicalTechologistBy.Id;
                }

                break;
            case "Urine":
                $scope.activeTabPathologistId = $scope.UrinPathologist.Id;
                $scope.CheckedById = null;
                $scope.MedicalTechologistId = null;
                if ($scope.UrineCheckedBy != null && $scope.UrineCheckedBy != undefined) {
                    $scope.CheckedById = $scope.UrineCheckedBy.Id;
                }
                if ($scope.UrineMedicalTechologistBy != null && $scope.UrineMedicalTechologistBy != undefined) {
                    $scope.MedicalTechologistId = $scope.UrineMedicalTechologistBy.Id;
                }

                break;
            case "Stool":
                $scope.activeTabPathologistId = $scope.StoolPathologist.Id;
                $scope.CheckedById = null;
                $scope.MedicalTechologistId = null;
                if ($scope.StoolCheckedBy != null && $scope.StoolCheckedBy != undefined) {
                    $scope.CheckedById = $scope.StoolCheckedBy.Id;
                }
                if ($scope.StoolMedicalTechologistBy != null && $scope.StoolMedicalTechologistBy != undefined) {
                    $scope.MedicalTechologistId = $scope.StoolMedicalTechologistBy.Id;
                }

                break;
            case "LabReport":
                $scope.activeTabPathologistId = $scope.LabPathologist.Id;
                $scope.CheckedById = null;
                $scope.MedicalTechologistId = null;
                if ($scope.LabCheckedBy != null && $scope.LabCheckedBy != undefined) {
                    $scope.CheckedById = $scope.LabCheckedBy.Id;
                }
                if ($scope.LabMedicalTechologistBy != null && $scope.LabMedicalTechologistBy != undefined) {
                    $scope.MedicalTechologistId = $scope.LabMedicalTechologistBy.Id;
                }

                break;
            case "Microbiology":
                $scope.activeTabPathologistId = $scope.MicroBiologyPathologist.Id;
                $scope.CheckedById = null;
                $scope.MedicalTechologistId = null;
                if ($scope.MicrobiologyCheckedBy != null && $scope.MicrobiologyCheckedBy != undefined) {
                    $scope.CheckedById = $scope.MicrobiologyCheckedBy.Id;
                }
                if ($scope.MicrobiologyMedicalTechologistBy != null && $scope.MicrobiologyMedicalTechologistBy != undefined) {
                    $scope.MedicalTechologistId = $scope.MicrobiologyMedicalTechologistBy.Id;
                }

                break;
        }
        $scope.printer.printReport('/LIS/Haematology/BioChemicalReportModal2?testOrderId=' + $scope.TestOrdId + '&pathoLogistId=' + $scope.activeTabPathologistId + '&topHeadId=' + $scope.topHeadValue + '&checkedById=' + $scope.CheckedById + '&medicalTechologistId=' + $scope.MedicalTechologistId);
    }


    //=========Call The Method When Param Value is not = 0
    if (paramId != "") {

        // $scope.GetComponentPreparationById();
    }
    else {
        $scope.LisPatient.Id = 0;
    }

    $scope.clearAllUrineResult = function () {
        if ($scope.clearAll) {
            $scope.Specimen = null;
            $scope.LISUrinExamResultDetails = [];
            angular.forEach($scope.examParticulars, function (item) {
                document.getElementsByName(item.ParticularIdentityNo)[0].value = null;
            });
        }
    }

    $scope.clearAllStoolResult = function () {
        if ($scope.clearAllStool) {
            $scope.LISStoolExamResultDetails = [];
            angular.forEach($scope.stoolExamParticulars, function (item) {
                document.getElementsByName(item.ParticularIdentityNo)[0].value = null;
            });
        }
    }


    //========================//
    $scope.Report = {};

    $scope.SelectRadiologist = function (x) {
        $scope.selectedRadiologist = x.ConsultantName;
        $scope.Report.LabTechnitianId = x.Id;
    };

    $scope.GetAllLabTechnicians = function () {
        $http({
            method: "GET",
            url: "/LIS/Haematology/GetAllLabTechnicians"
        }).success(function (response) {
            $scope.RadiologistList = response;
        }).error(function () {

        });
    };
    $scope.GetAllLabTechnicians();

    $scope.GetFileName = function () {
        $http({
            method: "GET",
            url: "/LIS/Haematology/GetAllFileName"
        }).success(function (response) {
            $scope.FileList = response;
        }).error(function () {

        });
    }
    $scope.GetFileName();


    $scope.SelectFile = function (x) {
        $http({
            method: "GET",
            url: "/LIS/Haematology/GetFileById?id=" + x.Id
        }).success(function (response) {
            CKEDITOR.instances.editor1.setData(response);
        }).error(function () {

        });
    }

    $scope.SaveTemplate = function () {
        if ($scope.Report == undefined || $scope.Report.FileName == undefined) {
            $scope.alerts.push({ 'type': 'danger', 'msg': "Please enter file name" });
            return;
        }
        $scope.Report.FileBody = CKEDITOR.instances.editor1.getData();
        $http({
            method: "POST",
            url: "/LIS/Haematology/SaveTemplate",
            data: { FileName: $scope.Report.FileName, FileBody: $scope.Report.FileBody, DigTestGroupId: 8 }
        }).success(function (response) {
            if (response.success) {
                $scope.submitted = false;
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            }
        }).error(function () {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    }

    $scope.SaveReport = function () {
        $scope.Report.DigTestOrderId = $scope.TestOrdId;
        $scope.Report.FileBody = CKEDITOR.instances.editor1.getData();
        $http({
            method: "POST",
            url: "/LIS/Haematology/SaveReport",
            data: { Report: $scope.Report}
        }).success(function (response) {
            if (response.Success) {
                $scope.submitted = false;
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
                $scope.IsDisabledPrint = false;
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            }
        }).error(function () {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    }

    $scope.GetPBFReportById = function () {

        $http({
            method: "POST",
            url: "/LIS/Haematology/GetPBFReportById",
            data: { id: $scope.TestOrdId }
        }).success(function mySucces(response) {
            $scope.Report.FileName = response.FileInfo.FileName;
            CKEDITOR.instances.editor1.setData(response.FileInfo.FileBody);
            $scope.Report.LabTechnitianId = response.LabTechnitianId;
            $scope.selectedRadiologist = response.Pathologist;
        }).error(function myError(response) {
            //$scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });
        });
    }

    if ($scope.TestOrdId != "") {
        $scope.GetPBFReportById();
    }



    //=================MISC Report=============//
    $scope.MISCReport = {};

    $scope.SelectMISCRadiologist = function (x) {
        $scope.selectedMISCRadiologist = x.ConsultantName;
        $scope.MISCReport.LabTechnitianId = x.Id;
    };

    $scope.GetAllMISCFileName = function () {
        $http({
            method: "GET",
            url: "/LIS/Haematology/GetAllMISCFileName"
        }).success(function (response) {
            $scope.MISCFileList = response;
        }).error(function () {

        });
    }
    $scope.GetAllMISCFileName();

    $scope.SelectMISCFile = function (x) {
        $http({
            method: "GET",
            url: "/LIS/Haematology/GetFileById?id=" + x.Id
        }).success(function (response) {
            CKEDITOR.instances.editor2.setData(response);
        }).error(function () {

        });
    }

    $scope.SaveMISCTemplate = function () {
        if ($scope.MISCReport == undefined || $scope.MISCReport.FileName == undefined) {
            $scope.alerts.push({ 'type': 'danger', 'msg': "Please enter file name" });
            return;
        }
        $scope.MISCReport.FileBody = CKEDITOR.instances.editor2.getData();
        $http({
            method: "POST",
            url: "/LIS/Haematology/SaveMISCTemplate",
            data: { FileName: $scope.MISCReport.FileName, FileBody: $scope.MISCReport.FileBody, DigTestGroupId: 35 }
        }).success(function (response) {
            if (response.success) {
                $scope.submitted = false;
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            }
        }).error(function () {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    }

    $scope.SaveMISCReport = function () {
        $scope.MISCReport.DigTestOrderId = $scope.TestOrdId;
        $scope.MISCReport.FileBody = CKEDITOR.instances.editor2.getData();
        $http({
            method: "POST",
            url: "/LIS/Haematology/SaveMISCReport",
            data: { Report: $scope.MISCReport, rptDate: $scope.TestOrderIdLoadDate }
        }).success(function (response) {
            if (response.Success) {
                $scope.submitted = false;
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
                $scope.IsDisabledPrint = false;
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            }
        }).error(function () {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    }

    $scope.GetMISCReportById = function () {
        $http({
            method: "POST",
            url: "/LIS/Haematology/GetMISCReportById",
            data: { id: $scope.TestOrdId }
        }).success(function mySucces(response) {
            debugger;
            $scope.MISCReport.FileName = response.FileInfo.FileName;
            CKEDITOR.instances.editor2.setData(response.FileInfo.FileBody);
            $scope.MISCReport.LabTechnitianId = response.LabTechnitianId;
            $scope.selectedMISCRadiologist = response.Pathologist;
        }).error(function myError(response) {
            //$scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });
        });
    }

    $scope.GetMISCById = function () {
        $http({
            method: "POST",
            url: "/LIS/Haematology/GetMISCById",
            data: { id: $scope.TestOrdId }
        }).success(function mySucces(response) {
            debugger;
            $scope.MISCReport.FileName = response.FileInfo.FileName;
            CKEDITOR.instances.editor2.setData(response.FileInfo.FileBody);
            $scope.MISCReport.LabTechnitianId = response.LabTechnitianId;
            $scope.selectedMISCRadiologist = response.Pathologist;
            debugger;
            $scope.miscTestName = $scope.miscTestNames.filter((x) => x.Id === response.TestId)[0];
            $scope.miscCheckedBySignId = $scope.CheckedByList.filter((x) => x.Id === response.CheckedBySignId)[0];
            $scope.miscMedicalTechologistSignId = $scope.MedicalTechologistList.filter((x) => x.Id === response.MedicalTechologistSignId)[0];

        }).error(function myError(response) {
        });
    }

    if ($scope.TestOrdId != "") {
        $scope.GetMISCReportById();
    }


    //=================MISC Report=============//
    $scope.HistoReport = {};

    $scope.SelectHistoRadiologist = function (x) {
        $scope.selectedHistoRadiologist = x.ConsultantName;
        $scope.HistoReport.LabTechnitianId = x.Id;
    };

    $scope.GetAllHistoFileName = function () {
        $http({
            method: "GET",
            url: "/LIS/Haematology/GetAllHistoFileName"
        }).success(function (response) {
            $scope.HistoFileList = response;
        }).error(function () {

        });
    }
    $scope.GetAllHistoFileName();

    $scope.selectedHistoFile = null;
    $scope.SelectHistoFile = function (x) {
        $scope.selectedHistoFile = x;

        $http({
            method: "GET",
            url: "/LIS/Haematology/GetFileById?id=" + x.Id
        }).success(function (response) {
            CKEDITOR.instances.editor3.setData(response);
        }).error(function () {

        });
    }

    $scope.SaveHistoTemplate = function () {
        if ($scope.HistoReport == undefined || $scope.HistoReport.FileName == undefined) {
            $scope.alerts.push({ 'type': 'danger', 'msg': "Please enter file name" });
            return;
        }
        $scope.HistoReport.FileBody = CKEDITOR.instances.editor3.getData();
        $http({
            method: "POST",
            url: "/LIS/Haematology/SaveHistoTemplate",
            data: { FileName: $scope.HistoReport.FileName, FileBody: $scope.HistoReport.FileBody, DigTestGroupId: 5 }
        }).success(function (response) {
            if (response.success) {
                $scope.submitted = false;
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            }
        }).error(function () {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    }

    $scope.SaveHistoReport = function () {
        $scope.HistoReport.DigTestOrderId = $scope.TestOrdId;
        $scope.HistoReport.FileBody = CKEDITOR.instances.editor3.getData();
        $http({
            method: "POST",
            url: "/LIS/Haematology/SaveHistoReport",
            data: { Report: $scope.HistoReport }
        }).success(function (response) {
            if (response.Success) {
                $scope.submitted = false;
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
                $scope.IsDisabledPrint = false;
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            }
        }).error(function () {
            $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
        });
    }

    $scope.GetHistoReportById = function () {

        $http({
            method: "POST",
            url: "/LIS/Haematology/GetHistoReportById",
            data: { id: $scope.TestOrdId }
        }).success(function mySucces(response) {
            $scope.HistoReport.FileName = response.FileInfo.FileName;
            CKEDITOR.instances.editor3.setData(response.FileInfo.FileBody);
            $scope.HistoReport.LabTechnitianId = response.LabTechnitianId;
            $scope.selectedHistoRadiologist = response.Pathologist;
        }).error(function myError(response) {
            //$scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.fetch_Warning });
        });
    }

    $scope.GetHistoById = function () {
        $http({
            method: "POST",
            url: "/LIS/Haematology/GetHistoById",
            data: { id: $scope.TestOrdId }
        }).success(function mySucces(response) {
            $scope.HistoReport.FileName = response.FileInfo.FileName;
            CKEDITOR.instances.editor3.setData(response.FileInfo.FileBody);
            $scope.HistoReport.LabTechnitianId = response.LabTechnitianId;
            $scope.selectedHistoRadiologist = response.Pathologist;
        }).error(function myError(response) {
        });
    }

    $scope.selectHistoTestName = function (investigation) {
        $scope.HistoReport.DigTestOrderDetailsTestId = investigation.Id;
        $scope.HistoReport.TestName = investigation.TestName;
        $scope.HistoReport.DigTestOrderId = $scope.TestOrdId;
        $http({
            method: "POST",
            url: "/LIS/Haematology/GetHistoReportFilyByTestId",
            data: { TestId: investigation.Id, OrderId: $scope.TestOrdId }
        }).success(function (response) {
            if (response.success == true) {
                CKEDITOR.instances.editor3.setData(response.FileBody);
                $scope.IsDisabledPrint = false;
            }
            else {
                if ($scope.selectedHistoFile != null) {
                    $scope.SelectHistoFile($scope.selectedHistoFile);
                }
                else {
                    CKEDITOR.instances.editor3.setData("");
                }
                $scope.IsDisabledPrint = true;
            }
        }).error(function () {

        });
        $scope.GetHistoImages($scope.HistoReport.DigTestOrderId, $scope.HistoReport.DigTestOrderDetailsTestId);
    }


    $scope.SaveHistoImages = function () {
        if ($scope.HistoReport.DigTestOrderId > 0 && $scope.HistoReport.DigTestOrderDetailsTestId > 0) {
            var formData = new FormData();
            formData.append("testOrderId", $scope.HistoReport.DigTestOrderId);
            formData.append("testId", $scope.HistoReport.DigTestOrderDetailsTestId);
            var fileInput = document.getElementById('file');
            for (i = 0; i < fileInput.files.length; i++) {
                var sfilename = fileInput.files[i].name;
                formData.append(sfilename, fileInput.files[i]);
            }

            $.ajax({
                url: "/LIS/Haematology/SaveHistoPic",
                type: 'POST',
                data: formData,
                contentType: false,
                cache: false,
                processData: false,
                success: function (data) {
                    if (data) {
                        $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
                        $scope.GetHistoImages($scope.HistoReport.DigTestOrderId, $scope.HistoReport.DigTestOrderDetailsTestId);
                    }
                    else {
                        $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
                    }
                }
            });
        }
        else {
            $scope.alerts.push({ 'type': 'danger', 'msg': 'Select Inv. No and Test Name' });
        }
    }

    $scope.GetHistoImages = function (testOrderId, testId) {
        $http({
            method: "POST",
            url: "/LIS/Haematology/GetHistoImages",
            data: { "testOrderId": testOrderId, "testId": testId }
        }).success(function (response) {
            $scope.ImageHistoList = response;
        }).error(function () {

        });
    }

    if ($scope.TestOrdId != "") {
        $scope.GetHistoReportById();
    }

    $scope.NoteSetup = {};
    $scope.NoteSetup.Id = 0;

    $scope.NoteTypeList = [
        { 'Name': 'Heamatology' },
        { 'Name': 'Biochemical' },
        { 'Name': 'Serology' },
        { 'Name': 'Immunology' },
        { 'Name': 'Urine R/E' },
        { 'Name': 'Stool' },
        { 'Name': 'Lab Report' },
        { 'Name': 'Microbiology' },
    ];

    $scope.OnSelectNoteType = function (x) {
        $scope.NoteSetup.NoteType = x.Name;
        $scope.NoteSetup.NoteTitle = "";
        $scope.NoteTitleList = $scope.NoteSetupList.filter(function (item) {
            return item.NoteType === $scope.NoteSetup.NoteType;
        });
    }

    $scope.GetAllLisNotes = function () {
        $http({
            method: "GET",
            url: "/LIS/Haematology/GetAllLisNotes"
        }).success(function (response) {
            $scope.NoteSetupList = response;

            $scope.NoteHeamatologyList = $scope.NoteSetupList.filter(function (item) {
                return item.NoteType === "Heamatology";
            });
           
            $scope.NoteBiochemicalList = $scope.NoteSetupList.filter(function (item) {
                return item.NoteType === "Biochemical";
            });

            $scope.NoteSerologyList = $scope.NoteSetupList.filter(function (item) {
                return item.NoteType === "Serology";
            });

            $scope.NoteImmunologyList = $scope.NoteSetupList.filter(function (item) {
                return item.NoteType === "Immunology";
            });

            $scope.NoteUrineList = $scope.NoteSetupList.filter(function (item) {
                return item.NoteType === "Urine R/E";
            });

            $scope.NoteStoolList = $scope.NoteSetupList.filter(function (item) {
                return item.NoteType === "Stool";
            });

            $scope.NoteLabReportList = $scope.NoteSetupList.filter(function (item) {
                return item.NoteType === "Lab Report";
            });

            $scope.NoteMicrobiologyList = $scope.NoteSetupList.filter(function (item) {
                return item.NoteType === "Microbiology";
            });
           
        }).error(function () {
        });
    }
    $scope.GetAllLisNotes();

    $scope.OnSelectNoteTitle = function (x) {
        $scope.NoteSetup.Id = x.Id;
        $scope.NoteSetup.NoteType = x.NoteType;
        $scope.NoteSetup.NoteTitle = x.NoteTitle;
        $scope.NoteSetup.Note = x.Note;
    }

    $scope.ClearNoteSetup = function () {
        $scope.NoteSetup.Id = 0;
        $scope.NoteSetup.NoteTitle = "";
        $scope.NoteSetup.Note = "";
        $scope.GetAllLisNotes();
    }

    $scope.SaveNoteSetup = function () {
        $http({
            method: "POST",
            url: "/LIS/Haematology/SaveNoteSetup",
            data: { "noteSetup": $scope.NoteSetup }
        }).success(function (response) {
            if (response.Success) {
                $scope.NoteSetup.Id = response.Id;
                $scope.alerts.push({ 'type': 'success', 'msg': $scope.appMessage.save });
            }
            else {
                $scope.alerts.push({ 'type': 'danger', 'msg': $scope.appMessage.failure });
            }
        }).error(function () {
        });
    }

    $scope.OnSelectHematologyNote = function (x) {
        debugger;
        $scope.LisPatient.Remarks = x.Note;
    }
    $scope.AddRemarks = function (x) {
        debugger;
        $scope.LisPatient.Remarks = x;
    }

    $scope.OnSelectBiochemicalNote = function (x) {
        $scope.LisPatient.BiochemicalRemarks = x.Note;
    }

    $scope.OnSelectSerologyNote = function (x) {
        $scope.LisPatient.SerologyRemarks = x.Note;
    }

    $scope.OnSelectImmunologyNote = function (x) {
        $scope.LisPatient.ImmunologyRemarks = x.Note;
    }

    $scope.OnSelectUrineNote = function (x) {
        $scope.LISUrinExamResult.Comments = x.Note;
    }

    $scope.OnSelectStoolNote = function (x) {
        $scope.LISStoolExamResult.Comments = x.Note;
    }

    $scope.OnSelectLabReportNote = function (x) {
        $scope.LisPatient.LabRemarks = x.Note;
    }

    $scope.OnSelectMicrobiologyNote = function (x) {
        $scope.LisPatient.MicrobiologyRemarks = x.Note;
    }

    $scope.LabExamResultsfilterId = null;
    $scope.setMiscTestId2 = function (x) {
        $scope.LabExamResultsfilterId = x.Id;
    }
    $scope.clearMiscTestId2 = function (x) {
        $scope.LabExamResultsfilterId = null;
    }
   
}]);
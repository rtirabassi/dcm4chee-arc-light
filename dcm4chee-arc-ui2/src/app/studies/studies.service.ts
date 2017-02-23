import { Injectable } from '@angular/core';
import {Http, RequestMethod, RequestOptions, Headers, Request, URLSearchParams} from "@angular/http";
import {DatePipe} from "@angular/common";
import * as _ from "lodash";
import {Observable} from "rxjs";
declare var DCM4CHE: any;
declare var window:any

@Injectable()
export class StudiesService {
    private _patientIod:any;
    private _mwlIod:any;
    integerVr = ["DS","FL","FD","IS","SL","SS","UL", "US"];

    get patientIod(): any {
        return this._patientIod;
    }
    get mwlIod(): any {
        return this._mwlIod;
    }

    set patientIod(value: any) {
        this._patientIod = value;
    }
    set mwlIod(value: any) {
        this._mwlIod = value;
    }

    constructor(public $http:Http, public datePipe:DatePipe) { }

    getTodayDate() {
        let todayDate = new Date();
        return this.datePipe.transform(todayDate, 'yyyyMMdd');
    }
    getWindow(){
        return window;
    }
    getAes(user, aes){
        console.log("in get aes service");
        if(!user || !user.user || user.roles.length === 0){
            return aes;
        }else{
            var endAes = [];
            var valid;
            aes.forEach((ae, i) => {
                valid = false;
                user.roles.forEach((user, i)=>{
                    ae.dcmAcceptedUserRole.forEach((aet, j) => {
                        if(user === aet){
                            valid = true;
                        }
                    })
                });
                if(valid){
                    endAes.push(ae);
                }
            });
            return endAes;
        }
    }
    _config = function(params) {
        console.log("jquery params",jQuery.param(params));
        return "?" + jQuery.param(params);
    };

    replaceKeyInJson(object, key, key2){
        let $this = this;
        _.forEach(object,function(m, k){
            if(m[key]){
                object[k][key2] = [object[k][key]];
                delete object[k][key];
            }
            if(m.vr && m.vr !="SQ" && !m.Value){
                if(m.vr === "PN"){
                    object[k]["Value"] = object[k]["Value"] || [{Alphabetic:''}];
                    object[k]["Value"] = [{Alphabetic:''}];
                }else{
                    object[k]["Value"] = [""];
                }
            }
            if((Object.prototype.toString.call(m) === '[object Array]') || (object[k] !== null && typeof(object[k]) == "object")) {
                $this.replaceKeyInJson(m, key, key2);
            }
        });
        return object;
    };
    initEmptyValue(object){
        // console.log(".", object);
        let $this = this;
        _.forEach(object,function(m, k){
            console.log("m",m);
            if(m && m.vr && m.vr==="PN" && m.vr !="SQ" && (!m.Value || m.Value[0] === null)){
                console.log("in pnvalue=",m);
                object[k]["Value"] = [{
                    Alphabetic:""
                }];
            }
            if(m && m.vr && m.vr !="SQ" && !m.Value){
                object[k]["Value"] = [""];
            }
            if(m && (_.isArray(m) || (m && _.isObject(m)))) {
                console.log("beforecall",m);
                $this.initEmptyValue(m);
            }
        });
        return object;
    };

    queryPatients = function(url, params) {
        console.log("this._config(aparms", this._config(params));

        // this.headers = new Headers();
        // this.headers.append('Content-Type', 'application/json');
        // this.headers.append('Parameter',  + params);
        //
        //
        // let options = new RequestOptions({
        //     method: RequestMethod.Get,
        //     url: url,
        //     headers: this.headers
        // });
        // this.http.request(new Request(this.options))

        return this.$http.get(url + '/patients' + this._config(params)).map(res => {let resjson;try{resjson = res.json();}catch (e){resjson = {};} return resjson;});
    };

    queryStudies = function(url, params) {
        console.log("in querystudies");
        return this.$http.get(url + '/studies' + this._config(params)).map(res => {
            let resjson;
            try{
                resjson = res.json();
            }catch (e){
                resjson = {};
            }
            return resjson;
        });
    };
    queryMwl = function(url, params) {
        return this.$http.get(url + '/mwlitems' + this._config(params)).map(res => {let resjson;try{resjson = res.json();}catch (e){resjson = {};} return resjson;});
    };

    querySeries = function(url, studyIUID, params) {
        return this.$http.get(url + '/studies/' + studyIUID + '/series' + this._config(params)).map(res => {let resjson;try{resjson = res.json();}catch (e){resjson = {};} return resjson;});
    };

    queryInstances = function(url, studyIUID, seriesIUID, params) {
        return this.$http.get(url
            + '/studies/' + studyIUID
            + '/series/' + seriesIUID
            + '/instances' +
            this._config(params)).map(res => {let resjson;try{resjson = res.json();}catch (e){resjson = {};} return resjson;});
    };

    getPatientIod(){
        console.log("_patientIod",this._patientIod);
        if (this._patientIod) {
            return Observable.of(this._patientIod);
        } else {
            return this.$http.get('assets/iod/patient.iod.json').map(res => {let resjson;try{resjson = res.json();}catch (e){resjson = {};} return resjson;});
        }
    };
    getMwlIod(){
        console.log("_mwlIod",this._mwlIod);
        if (this._mwlIod) {
            return Observable.of(this._mwlIod);
        } else {
            return this.$http.get('assets/iod/mwl.iod.json').map(res => {let resjson;try{resjson = res.json();}catch (e){resjson = {};} return resjson;});
        }
    };
    getArrayFromIodHelper(data, dropdown){
        _.forEach(data, function(m, i){
            // console.log("i",i);
            // console.log("m",m);
            if(i === "00400100"){
                console.log("in if m",m.items);
                _.forEach(m.items, function(l, j){
                    // console.log("l",l);
                    // console.log("j",j);
                    dropdown.push({
                        "code":"00400100:"+j,
                        "codeComma": ">"+j.slice(0, 4)+","+j.slice(4),
                        "name":DCM4CHE.elementName.forTag(j)
                    });
                });
            }else{
                dropdown.push({
                    "code":i,
                    "codeComma": i.slice(0, 4)+","+i.slice(4),
                    "name":DCM4CHE.elementName.forTag(i)
                });
            }
        });
        return dropdown;
    };
    getArrayFromIod(res){
        let dropdown = [];
        this.getArrayFromIodHelper(res, dropdown);
        return dropdown;
    };

    clearPatientObject(object){
        let $this = this;
        _.forEach(object, function(m,i){
            if(typeof(m) === "object" && i != "vr"){
                $this.clearPatientObject(m);
            }else{
                var check = typeof(i) === "number" || i === "vr" || i === "Value" || i === "Alphabetic" || i === "Ideographic" || i === "Phonetic" || i === "items";
                if(!check){
                    delete object[i];
                }
            }
        });
    };
    convertStringToNumber(object){
        let $this = this;
        _.forEach(object, function(m,i){
            if(typeof(m) === "object" && i != "vr"){
                $this.convertStringToNumber(m);
            }else{
                if(i === "vr"){
                    if(($this.integerVr.indexOf(object.vr) > -1 && object.Value && object.Value.length > 0)){
                        if(object.Value.length > 1){
                            _.forEach(object.Value,(k, j) =>{
                                object.Value[j] = Number(object.Value[j]);
                            });
                        }else{
                            object.Value[0] = Number(object.Value[0]);
                        }
                    }

                }
            }
        });
    };
    clearSelection(patients){
        _.forEach(patients,function(patient, i){
            patient.selected = false;
            if(patient.studies){
                _.forEach(patient.studies,function(study, j){
                    study.selected = false;
                    if(study.series){
                        _.forEach(study.series,function(serie, j){
                            serie.selected = false;
                            if(serie.instances){
                                _.forEach(serie.instances,function(instance, j){
                                    instance.selected = false;
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    MergeRecursive(clipboard, selected) {
        _.forEach(selected, function(study, studykey){
            clipboard[studykey] = clipboard[studykey] || selected[studykey];
            if(clipboard[studykey]){
                if(study["ReferencedSeriesSequence"]){
                    clipboard[studykey]["ReferencedSeriesSequence"] = clipboard[studykey]["ReferencedSeriesSequence"] || study["ReferencedSeriesSequence"]
                    _.forEach(study["ReferencedSeriesSequence"] ,function(selSeries,selSeriesKey){

                        let SeriesInstanceUIDInArray = false;
                        _.forEach(clipboard[studykey]["ReferencedSeriesSequence"] ,function(clipSeries,clipSeriesKey){
                            if(clipSeries.SeriesInstanceUID === selSeries.SeriesInstanceUID){
                                SeriesInstanceUIDInArray = true;
                                if(selSeries.ReferencedSOPSequence){
                                    if(clipSeries.ReferencedSOPSequence){
                                        _.forEach(selSeries.ReferencedSOPSequence , function(selInstance, selSeriesKey){
                                            let sopClassInstanceUIDInArray = false;
                                            _.forEach(clipSeries.ReferencedSOPSequence , function(clipInstance, clipInstanceKey){
                                                if(clipInstance.ReferencedSOPClassUID && clipInstance.ReferencedSOPClassUID === selInstance.ReferencedSOPClassUID && clipInstance.ReferencedSOPInstanceUID && clipInstance.ReferencedSOPInstanceUID === selInstance.ReferencedSOPInstanceUID){
                                                    sopClassInstanceUIDInArray = true;
                                                }
                                            });
                                            if(!sopClassInstanceUIDInArray){
                                                clipSeries.ReferencedSOPSequence.push(selInstance);
                                            }
                                        });
                                    }
                                }
                            }
                        });
                        if(!SeriesInstanceUIDInArray){
                            clipboard[studykey]["ReferencedSeriesSequence"].push(selSeries);
                        }
                    });
                }
            }
        });
    }
    /*
    * Removing the element from clipboard, called from delete button on the clipboard or on copy-move dialog
    * @modus: what kind of object is the object that should be removed
    * @keys: the indexes where the object is in clipboard
    * @clipboard: the clipboard object
    * */
    removeClipboardElement(modus, keys, clipboard){
        switch(modus) {
            case "patient":
                delete clipboard.selected[keys.patientkey];
                break;
            case "study":
                delete clipboard.selected[keys.studykey];
                break;
            case "serie":
                delete clipboard.selected[keys.studykey].ReferencedSeriesSequence[keys.serieskey];
                break;
            case "instance":
                clipboard.selected[keys.studykey].ReferencedSeriesSequence[keys.serieskey].ReferencedSOPSequence.splice(keys.instancekey,1);
                break;
            default:
        }
        /*
        * Check if there are any patient in the clipboard anymore
        * */
        let haspatient = false;
        _.forEach(clipboard.selected, (m,i)=>{
            if(i != '' && (!m || _.size(m) === 0)){
                haspatient = true;
            }
        })
        clipboard.hasPatient = haspatient;
    }
}

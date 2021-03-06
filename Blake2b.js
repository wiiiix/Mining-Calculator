/* Copyright (c) 2018 by KizmoTek <KizmoTek@gmail.com>
 * All rights reserved.
 *
 * License: 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   - Redistributions of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

 moment().format();

const siaBlockTime = 600; // all time done in seconds
const hyperBlockTime = 600;
const primeBlockTime = 600;
const classicBlockTime = 600;
const cash2BlockTime = 9;

const hour = 3600;
const day = hour * 24;
const week = day * 7;
const month = day * 30; // assume month = 30 days

const miningAPI = "https://keops.cc/dbs/pansia_current.json";
var mineAPILoad = false


const cash2API = "https://blocks.cash2.org:8080/getinfo";
var cash2APILoad = false

const hyperPriceAPI = "https://api.coingecko.com/api/v3/coins/hyperspace/market_chart?vs_currency=usd&days=1"
var hyperPriceAPILoad = false

const siaPriceAPI = "https://api.coingecko.com/api/v3/coins/siacoin/market_chart?vs_currency=usd&days=1"
var siaPriceAPILoad = false

const primePriceAPI = "https://api.coingecko.com/api/v3/coins/siaprime-coin/market_chart?vs_currency=usd&days=1"
var primePriceAPILoad = false

//const CBprimePriceAPI = "https://api.crypto-bridge.org/api/v1/ticker/BTC_SCP"
//var CBprimePriceAPILoad = false

const classicPriceAPI = "https://api.coingecko.com/api/v3/coins/siaclassic/market_chart?vs_currency=usd&days=1"
var classicPriceAPILoad = false

const cash2PriceAPI = "https://api.coingecko.com/api/v3/coins/cash2/market_chart?vs_currency=usd&days=1"
var cash2PriceAPILoad = false

const btcPriceAPI = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
var btcPriceAPILoad = false
var bitcoinUSDPrice

let diffToggle = document.getElementById("diffToggleSwitch")
var diffAdjust = true // Toggles adjusting difficulty for added hashrate
let hshrt = 0

const greenColor = "#30fa30"
const redColor = "#d20000"
const greenColorDark = "#22b522"
const redColorDark = "#d86161"


var PowerCostHour = document.querySelector("#PowerCostHour")
var PowerCostDay = document.querySelector("#PowerCostDay")
var PowerCostWeek = document.querySelector("#PowerCostWeek")
var PowerCostMonth = document.querySelector("#PowerCostMonth")

let PowerCostHourResult
let PowerCostDayResult
let PowerCostWeekResult
let PowerCostMonthResult

//Hyperspace-------------------------------------------------------------------
var XSCVolumeValue = document.querySelector("#XSCVolumeValue")

var XSCcalcHour = document.querySelector("#XSCresultHour")
var XSCcalcDay = document.querySelector("#XSCresultDay")
var XSCcalcWeek = document.querySelector("#XSCresultWeek")
var XSCcalcMonth = document.querySelector("#XSCresultMonth")

var XSCcalcHourUSD = document.querySelector("#XSCresultHourUSD")
var XSCcalcDayUSD = document.querySelector("#XSCresultDayUSD")
var XSCcalcWeekUSD = document.querySelector("#XSCresultWeekUSD")
var XSCcalcMonthUSD = document.querySelector("#XSCresultMonthUSD")

var XSCresultHourProfit = document.querySelector("#XSCresultHourProfit")
var XSCresultDayProfit = document.querySelector("#XSCresultDayProfit")
var XSCresultWeekProfit = document.querySelector("#XSCresultWeekProfit")
var XSCresultMonthProfit = document.querySelector("#XSCresultMonthProfit")

var XSCresultHourProfitUSD = document.querySelector("#XSCresultHourProfitUSD")
var XSCresultDayProfitUSD = document.querySelector("#XSCresultDayProfitUSD")
var XSCresultWeekProfitUSD = document.querySelector("#XSCresultWeekProfitUSD")
var XSCresultMonthProfitUSD = document.querySelector("#XSCresultMonthProfitUSD")

var hyperAPIDifficulty
var hyperAPIheight

let hyperHourresult
let hyperDayresult
let hyperWeekresult
let hyperMonthresult

let hyperUSDHourresult
let hyperUSDDayresult
let hyperUSDWeekresult
let hyperUSDMonthresult

//Sia Prime
const SCPDevFeeStart = moment('04/30/2019').unix()
const SCPDevFeeEnd = moment('10/31/2020').unix()

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var newToday = yyyy + '-' + mm + '-' + dd

let currDate = moment(newToday).unix()

let SCPDevFee = .20  // Starts at 20%
if (currDate > SCPDevFeeStart) {
    if (currDate < SCPDevFeeEnd) {
        SCPDevFee = (0.2 - (SCPDevFeeEnd - currDate) * (0.1 / (SCPDevFeeEnd - SCPDevFeeStart)))
    } else {
        SCPDevFee = 0
    }
}

var SCPVolumeValue = document.querySelector("#SCPVolumeValue")

var SCPcalcHour = document.querySelector("#SCPresultHour")
var SCPcalcDay = document.querySelector("#SCPresultDay")
var SCPcalcWeek = document.querySelector("#SCPresultWeek")
var SCPcalcMonth = document.querySelector("#SCPresultMonth")

var SCPcalcHourUSD = document.querySelector("#SCPresultHourUSD")
var SCPcalcDayUSD = document.querySelector("#SCPresultDayUSD")
var SCPcalcWeekUSD = document.querySelector("#SCPresultWeekUSD")
var SCPcalcMonthUSD = document.querySelector("#SCPresultMonthUSD")

var SCPresultHourProfit = document.querySelector("#SCPresultHourProfit")
var SCPresultDayProfit = document.querySelector("#SCPresultDayProfit")
var SCPresultWeekProfit = document.querySelector("#SCPresultWeekProfit")
var SCPresultMonthProfit = document.querySelector("#SCPresultMonthProfit")

var SCPresultHourProfitUSD = document.querySelector("#SCPresultHourProfitUSD")
var SCPresultDayProfitUSD = document.querySelector("#SCPresultDayProfitUSD")
var SCPresultWeekProfitUSD = document.querySelector("#SCPresultWeekProfitUSD")
var SCPresultMonthProfitUSD = document.querySelector("#SCPresultMonthProfitUSD")

var SCPInfoText = document.querySelector("#SCPDisclaimerText")

var primeAPIDifficulty
var primeAPIheight

let primeHourresult
let primeDayresult
let primeWeekresult
let primeMonthresult

let primeUSDHourresult
let primeUSDDayresult
let primeUSDWeekresult
let primeUSDMonthresult

//Sia Classic
var SCCVolumeValue = document.querySelector("#SCCVolumeValue")

var SCCcalcHour = document.querySelector("#SCCresultHour")
var SCCcalcDay = document.querySelector("#SCCresultDay")
var SCCcalcWeek = document.querySelector("#SCCresultWeek")
var SCCcalcMonth = document.querySelector("#SCCresultMonth")

var SCCcalcHourUSD = document.querySelector("#SCCresultHourUSD")
var SCCcalcDayUSD = document.querySelector("#SCCresultDayUSD")
var SCCcalcWeekUSD = document.querySelector("#SCCresultWeekUSD")
var SCCcalcMonthUSD = document.querySelector("#SCCresultMonthUSD")

var SCCresultHourProfit = document.querySelector("#SCCresultHourProfit")
var SCCresultDayProfit = document.querySelector("#SCCresultDayProfit")
var SCCresultWeekProfit = document.querySelector("#SCCresultWeekProfit")
var SCCresultMonthProfit = document.querySelector("#SCCresultMonthProfit")

var SCCresultHourProfitUSD = document.querySelector("#SCCresultHourProfitUSD")
var SCCresultDayProfitUSD = document.querySelector("#SCCresultDayProfitUSD")
var SCCresultWeekProfitUSD = document.querySelector("#SCCresultWeekProfitUSD")
var SCCresultMonthProfitUSD = document.querySelector("#SCCresultMonthProfitUSD")

var classicAPIDifficulty
var classicAPIheight

let sccHourresult
let sccDayresult
let sccWeekresult
let sccMonthresult

let sccUSDHourresult
let sccUSDDayresult
let sccUSDWeekresult
let sccUSDMonthresult

//Sia
var SiaVolumeValue = document.querySelector("#SiaVolumeValue")

var SiacalcHour = document.querySelector("#SiaresultHour")
var SiacalcDay = document.querySelector("#SiaresultDay")
var SiacalcWeek = document.querySelector("#SiaresultWeek")
var SiacalcMonth = document.querySelector("#SiaresultMonth")

var SiacalcHourUSD = document.querySelector("#SiaresultHourUSD")
var SiacalcDayUSD = document.querySelector("#SiaresultDayUSD")
var SiacalcWeekUSD = document.querySelector("#SiaresultWeekUSD")
var SiacalcMonthUSD = document.querySelector("#SiaresultMonthUSD")

var SiaresultHourProfit = document.querySelector("#SiaresultHourProfit")
var SiaresultDayProfit = document.querySelector("#SiaresultDayProfit")
var SiaresultWeekProfit = document.querySelector("#SiaresultWeekProfit")
var SiaresultMonthProfit = document.querySelector("#SiaresultMonthProfit")

var SiaresultHourProfitUSD = document.querySelector("#SiaresultHourProfitUSD")
var SiaresultDayProfitUSD = document.querySelector("#SiaresultDayProfitUSD")
var SiaresultWeekProfitUSD = document.querySelector("#SiaresultWeekProfitUSD")
var SiaresultMonthProfitUSD = document.querySelector("#SiaresultMonthProfitUSD")

var siaAPIDifficulty
var siaAPIheight

let siaHourresult
let siaDayresult
let siaWeekresult
let siaMonthresult

let siaUSDHourresult
let siaUSDDayresult
let siaUSDWeekresult
let siaUSDMonthresult

//Cash2
var Cash2VolumeValue = document.querySelector("#Cash2VolumeValue")

var Cash2calcHour = document.querySelector("#CASH2resultHour")
var Cash2calcDay = document.querySelector("#CASH2resultDay")
var Cash2calcWeek = document.querySelector("#CASH2resultWeek")
var Cash2calcMonth = document.querySelector("#CASH2resultMonth")

var Cash2calcHourUSD = document.querySelector("#CASH2resultHourUSD")
var Cash2calcDayUSD = document.querySelector("#CASH2resultDayUSD")
var Cash2calcWeekUSD = document.querySelector("#CASH2resultWeekUSD")
var Cash2calcMonthUSD = document.querySelector("#CASH2resultMonthUSD")

var Cash2resultHourProfit = document.querySelector("#CASH2resultHourProfit")
var Cash2resultDayProfit = document.querySelector("#CASH2resultDayProfit")
var Cash2resultWeekProfit = document.querySelector("#CASH2resultWeekProfit")
var Cash2resultMonthProfit = document.querySelector("#CASH2resultMonthProfit")


var Cash2resultHourProfitUSD = document.querySelector("#CASH2resultHourProfitUSD")
var Cash2resultDayProfitUSD = document.querySelector("#CASH2resultDayProfitUSD")
var Cash2resultWeekProfitUSD = document.querySelector("#CASH2resultWeekProfitUSD")
var Cash2resultMonthProfitUSD = document.querySelector("#CASH2resultMonthProfitUSD")

var Cash2InfoText = document.querySelector("#Cash2DisclaimerText")

var CASH2APIDifficulty
var CASH2APIheight

let Cash2Hourresult
let Cash2HourFinal
let Cash2Dayresult
let Cash2DayFinal
let Cash2Weekresult
let Cash2WeekFinal
let Cash2Monthresult
let Cash2MonthFinal

let Cash2USDHourresult
let Cash2USDDayresult
let Cash2USDWeekresult
let Cash2USDMonthresult

//----------------------------------------------------------------------------
var calcHour = document.querySelector("#resultHour")
var calcDay = document.querySelector("#resultDay")
var calcWeek = document.querySelector("#resultWeek")
var calcMonth = document.querySelector("#resultMonth")

var userHshrt = document.getElementById("hashrate")
var hashPower = document.getElementById("hashPower")

var rejectRate = document.getElementById("rejectRate")
var poolFee = document.getElementById("poolFee")
var elecCost = document.getElementById("elecCost")
var powerConsumtion = document.getElementById("powerConsumtion")

var A3 = document.getElementById("A3")
var Baik = document.getElementById("Baik")
var B52 = document.getElementById("B52")
var iBe = document.getElementById("iBe")
var S11 = document.getElementById("S11")
var SC1 = document.getElementById("SC1")
var StrongU = document.getElementById("StrongU")
let totalPresetHashrate
let totalBlake2bHashrate
let totalBlake2bPower
let totalObeliskHashrate
let totalObeliskPower
let totalPresetPower
let usingPreset

let A3preset = 0
let Baikpreset = 0
let B52preset = 0
let iBepreset = 0
let S11preset = 0
let SC1preset = 0
let StrongUpreset = 0

let A3presetFinal = 0
let BaikpresetFinal = 0
let B52presetFinal = 0
let iBepresetFinal = 0
let S11presetFinal = 0
let SC1presetFinal = 0
let StrongUpresetFinal = 0

let A3presetPower = 0
let BaikpresetPower = 0
let B52presetPower = 0
let iBepresetPower = 0
let S11presetPower = 0
let SC1presetPower = 0
let StrongUpresetPower = 0




var APILoaded = 0
var APINeeded = 8

let miningAPIData = 0
fetch(miningAPI)
    .then(function (response) {
        if (response.ok == true) {
            return response.json();
        } else {
            fetch(miningAPI)
                .then(function (response) {
                    if (response.ok == true) {
                        return response.json();
                    } else {
                        mineAPILoad = false
                        alert("Error with loading Keops API data for Hyperspace, SiaPrime, SiaClassic, and Sia.")
                    }
                })
                .then(function (myJson) {
                    miningAPIData = myJson
                    mineAPILoad = true
                    APILoaded += 1
                    apiLoadVerify()
                })
        }

    })
    .then(function (myJson) {
        miningAPIData = myJson
        mineAPILoad = true
        APILoaded += 1
        apiLoadVerify()
    })
    .catch(function (err) {
        console.log('Failed to load Keops API: ', err);
        APINeeded = - 1
        apiLoadVerify()
    })


let cash2APIData = 0
fetch(cash2API)
    .then(function (response) {
        if (response.ok == true) {
            return response.json();
        } else {
            fetch(cash2API)
                .then(function (response) {
                    console.log(response.ok)
                    if (response.ok == true) {
                        return response.json();
                    } else {
                        cash2APILoad = false
                        alert("Error with loading Cash2 API.")
                    }
                })
                .then(function (myJson) {
                    cash2APIData = myJson
                    cash2APILoad = true
                    APILoaded += 1
                    apiLoadVerify()
                })
        }
    })
    .then(function (myJson) {
        cash2APIData = myJson
        cash2APILoad = true
        APILoaded += 1
        apiLoadVerify()
    })
    .catch(function (err) {
        console.log('Failed to load Cash2 API: ', err);
        APINeeded = - 1
        apiLoadVerify()
    })

let cash2PriceAPIData = 0
fetch(cash2PriceAPI)
    .then(function (response) {
        if (response.ok == true) {
            return response.json();
        } else {
            fetch(cash2PriceAPI)
                .then(function (response) {
                    if (response.ok == true) {
                        return response.json();
                    } else {
                        cash2PriceAPILoad = false
                        alert("Error with loading Cash2 API.")
                    }
                })
                .then(function (myJson) {
                    cash2PriceAPIData = myJson
                    cash2PriceAPILoad = true
                    APILoaded += 1
                    var volume = Math.round((cash2PriceAPIData.total_volumes[cash2PriceAPIData.total_volumes.length - 1][1]) * 100) / 100
                    Cash2VolumeValue.innerHTML = volume
                    if (volume < 100) {
                        Cash2VolumeValue.style.color = redColor
                        Cash2InfoText.innerHTML = "Very Low Volume"
                    }
                    Cash2VolumeValue.innerHTML = "$" + Cash2VolumeValue.innerHTML.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    apiLoadVerify()
                })
        }
    })
    .then(function (myJson) {
        cash2PriceAPIData = myJson
        cash2PriceAPILoad = true
        APILoaded += 1
        var volume = Math.round((cash2PriceAPIData.total_volumes[cash2PriceAPIData.total_volumes.length - 1][1]) * 100) / 100
        Cash2VolumeValue.innerHTML = volume
        if (volume < 100) {
            Cash2VolumeValue.style.color = redColor
            Cash2InfoText.innerHTML = "Very Low Volume"
        }
        Cash2VolumeValue.innerHTML = "$" + Cash2VolumeValue.innerHTML.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        apiLoadVerify()
    })
    .catch(function (err) {
        console.log('Failed to load Cash2 Price API: ', err);
        APINeeded = - 1
        apiLoadVerify()
    })

let siaPriceAPIData
fetch(siaPriceAPI)
    .then(function (response) {
        if (response.ok == true) {
            return response.json();
        } else {
            fetch(siaPriceAPI)
                .then(function (response) {
                    if (response.ok == true) {
                        return response.json();
                    } else {
                        siaPriceAPILoad = false
                        alert("Error with loading Sia API for Coingecko.")
                    }
                })
                .then(function (myJson) {
                    siaPriceAPIData = myJson
                    siaPriceAPILoad = true
                    APILoaded += 1
                    var volume = Math.round((siaPriceAPIData.total_volumes[siaPriceAPIData.total_volumes.length - 1][1]) * 100) / 100
                    SiaVolumeValue.innerHTML = volume
                    if (volume < 100) {
                        SiaVolumeValue.style.color = redColor
                    }
                    SiaVolumeValue.innerHTML = "$" + SiaVolumeValue.innerHTML.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    apiLoadVerify()
                })
        }
    })
    .then(function (myJson) {
        siaPriceAPIData = myJson
        siaPriceAPILoad = true
        APILoaded += 1
        var volume = Math.round((siaPriceAPIData.total_volumes[siaPriceAPIData.total_volumes.length - 1][1]) * 100) / 100
        SiaVolumeValue.innerHTML = volume
        if (volume < 100) {
            SiaVolumeValue.style.color = redColor
        }
        SiaVolumeValue.innerHTML = "$" + SiaVolumeValue.innerHTML.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        apiLoadVerify()
    })
    .catch(function (err) {
        console.log('Failed to load Sia Price API: ', err);
        APINeeded = - 1
        apiLoadVerify()
    })

let hyperPriceAPIData
fetch(hyperPriceAPI)
    .then(function (response) {
        if (response.ok == true) {
            return response.json();
        } else {
            fetch(hyperPriceAPI)
                .then(function (response) {
                    if (response.ok == true) {
                        return response.json();
                    } else {
                        hyperPriceAPILoad = false
                        alert("Error with loading Hyperspace API for Coingecko.")
                    }
                })
                .then(function (myJson) {
                    hyperPriceAPIData = myJson
                    hyperPriceAPILoad = true
                    APILoaded += 1
                    var volume = Math.round((hyperPriceAPIData.total_volumes[hyperPriceAPIData.total_volumes.length - 1][1]) * 100) / 100
                    XSCVolumeValue.innerHTML = volume
                    if (volume < 100) {
                        XSCVolumeValue.style.color = redColor
                    }
                    XSCVolumeValue.innerHTML = "$" + XSCVolumeValue.innerHTML.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    apiLoadVerify()
                })
        }
    })
    .then(function (myJson) {
        hyperPriceAPIData = myJson
        hyperPriceAPILoad = true
        APILoaded += 1
        var volume = Math.round((hyperPriceAPIData.total_volumes[hyperPriceAPIData.total_volumes.length - 1][1]) * 100) / 100
        XSCVolumeValue.innerHTML = volume
        if (volume < 100) {
            XSCVolumeValue.style.color = redColor
        }
        XSCVolumeValue.innerHTML = "$" + XSCVolumeValue.innerHTML.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        apiLoadVerify()
    })
    .catch(function (err) {
        console.log('Failed to load Hyperspace Price API: ', err);
        APINeeded = - 1
        apiLoadVerify()
    })

let primePriceAPIData
fetch(primePriceAPI)
    .then(function (response) {
        if (response.ok == true) {
            return response.json();
        } else {
            fetch(primePriceAPI)
                .then(function (response) {
                    if (response.ok == true) {
                        return response.json();
                    } else {
                        alert("Error with loading SiaPrime API from Coingecko.")
                        primePriceAPILoad = false
                    }
                })
                .then(function (myJson) {
                    primePriceAPIData = myJson
                    primePriceAPILoad = true
                    APILoaded += 1
                    var volume = Math.round(primePriceAPIData.total_volumes[primePriceAPIData.total_volumes.length - 1][1] * 100) / 100
                    SCPVolumeValue.innerHTML = volume
                    if (volume < 100) {
                        SCPVolumeValue.style.color = redColor
                        SCPInfoText.innerHTML = "Very Low Volume"
                    }
                    SCPVolumeValue.innerHTML = "$" + SCPVolumeValue.innerHTML.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    apiLoadVerify()
                })
        }
    })
    .then(function (myJson) {
        primePriceAPIData = myJson
        primePriceAPILoad = true
        APILoaded += 1
        var volume = Math.round(primePriceAPIData.total_volumes[primePriceAPIData.total_volumes.length - 1][1] * 100) / 100
        SCPVolumeValue.innerHTML = volume
        if (volume < 100) {
            SCPVolumeValue.style.color = redColor
            SCPInfoText.innerHTML = "Very Low Volume"
        }
        SCPVolumeValue.innerHTML = "$" + SCPVolumeValue.innerHTML.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        apiLoadVerify()
    })
    .catch(function (err) {
        console.log('Failed to load SiaPrime Price API: ', err);
        APINeeded = - 1
        apiLoadVerify()
    })

/*
let CBprimePriceAPIData
fetch(CBprimePriceAPI)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
        fetch(CBprimePriceAPI)
    .then(function(response) {
    if (response.ok == true) {
        return response.json();
    } else {
        alert("Error with loading SiaPrime API from Coingecko.")
        CBprimePriceAPILoad = false
    }
    })
    .then(function(myJson){
        CBprimePriceAPIData = myJson
        CBprimePriceAPILoad = true
        APILoaded += 1
        apiLoadVerify()
    })
    }
})
.then(function(myJson){
    CBprimePriceAPIData = myJson
    CBprimePriceAPILoad = true
    APILoaded += 1
    apiLoadVerify()
}) */



let classicPriceAPIData
fetch(classicPriceAPI)
    .then(function (response) {
        if (response.ok == true) {
            return response.json();
        } else {
            fetch(classicPriceAPI)
                .then(function (response) {
                    if (response.ok == true) {
                        return response.json();
                    } else {
                        classicPriceAPILoad = false
                        alert("Error with loading SiaClassic API from Coingecko.")
                    }
                })
                .then(function (myJson) {
                    classicPriceAPIData = myJson
                    classicPriceAPILoad = true
                    APILoaded += 1
                    var volume = Math.round((classicPriceAPIData.total_volumes[classicPriceAPIData.total_volumes.length - 1][1]) * 100) / 100
                    SCCVolumeValue.innerHTML = volume
                    if (volume < 100) {
                        SCCVolumeValue.style.color = redColor
                    }
                    SCCVolumeValue.innerHTML = "$" + SCCVolumeValue.innerHTML.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    apiLoadVerify()
                })
        }
    })
    .then(function (myJson) {
        classicPriceAPIData = myJson
        classicPriceAPILoad = true
        APILoaded += 1
        var volume = Math.round((classicPriceAPIData.total_volumes[classicPriceAPIData.total_volumes.length - 1][1]) * 100) / 100
        SCCVolumeValue.innerHTML = volume
        if (volume < 100) {
            SCCVolumeValue.style.color = redColor
        }
        SCCVolumeValue.innerHTML = "$" + SCCVolumeValue.innerHTML.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        apiLoadVerify()
    })
    .catch(function (err) {
        console.log('Failed to load SiaClassic Price API: ', err);
        APINeeded = - 1
        apiLoadVerify()
    })


let btcPriceAPIData
fetch(btcPriceAPI)
    .then(function (response) {
        if (response.ok == true) {
            return response.json();
        } else {
            fetch(btcPriceAPI)
                .then(function (response) {
                    if (response.ok == true) {
                        return response.json();
                    } else {
                        btcPriceAPIData = false
                        alert("Error with loading Bitcoin API from Coingecko.")
                    }
                })
                .then(function (myJson) {
                    btcPriceAPIData = myJson
                    btcPriceAPILoad = true
                    bitcoinUSDPrice = btcPriceAPIData.prices[btcPriceAPIData.prices.length - 1][1]
                    APILoaded += 1
                    apiLoadVerify()
                })
        }
    })
    .then(function (myJson) {
        btcPriceAPIData = myJson
        btcPriceAPILoad = true
        bitcoinUSDPrice = btcPriceAPIData.prices[btcPriceAPIData.prices.length - 1][1]
        APILoaded += 1
        apiLoadVerify()
    })

function apiLoadVerify() {
    if (APILoaded >= APINeeded) {
        console.log(APILoaded + " API's loaded")
        ChangeTheme()
        liveHashrate()
        presetUpdate()
    } else {
        console.log(APILoaded + " API's loaded")
    }
}

function liveHashrate() {
    userHshrt.value = splitInput(userHshrt.value)
    rejectRate.value = splitInput(rejectRate.value)
    poolFee.value = splitInput(poolFee.value)
    elecCost.value = splitInput(elecCost.value)
    powerConsumtion.value = splitInput(powerConsumtion.value)

    if (userHshrt.value == ".") {
        hshrt = 0
    }
    else {
        hshrt = userHshrt.value
    }

    if (rejectRate.value > 100) {
        rejectRate.value = 100
    }

    if (poolFee.value > 100) {
        poolFee.value = 100
    }

    if (hashPower.selectedIndex == 0) {
        hshrt = hshrt * 1e9
    }
    else if (hashPower.selectedIndex == 1) {
        hshrt = hshrt * 1e12
    }

    if (mineAPILoad == true) {
        hyper()
        if (hyperPriceAPILoad == true) {
            hyperPrice()
        }

        prime()
        if (primePriceAPILoad == true) {
            primePrice()
        }
        classic()
        if (classicPriceAPILoad == true) {
            classicPrice()
        }

        sia()
        if (siaPriceAPILoad == true) {
            siaPrice()
        }
    }

    if (cash2APILoad == true) {
        cash2()

        if (cash2PriceAPILoad == true) {
            cash2Price()
        }
    }



    calcProfit()
}

window.onload = function () {
    toggleCurrency()
}

function clearPreset() {
    usingPreset = false

    A3.value = 0
    A3preset = 0

    Baik.value = 0
    Baikpreset = 0

    B52.value = 0
    B52presetPower = 0

    iBe.value = 0
    iBepreset = 0

    S11.value = 0
    S11preset = 0

    StrongU.value = 0
    StrongUpreset = 0

    SC1.value = 0
    SC1preset = 0
}

rejectRate.value = 0
poolFee.value = 1
elecCost.value = 0.1
//const randomHshrt = [[815, 1275], [4300, 1350], [550, 500], [3830, 1380], [7000, 2100], [5500, 1600]]
//const randomizer = randomHshrt[Math.floor(Math.random()*randomHshrt.length)]
if (localStorage.getItem('mainData') == null) {
    //userHshrt.value = randomizer[0]
    //powerConsumtion.value = randomizer[1]
    S11.value = 1
} else {
    var data = localStorage.getItem('mainData')
    var newData = JSON.parse(data)
    userHshrt.value = newData.Hashrate
    hashPower.value = newData.HashPower
    diffToggle.checked = newData.DifficultyAdjust
    if (diffToggle.checked == true) {
        diffAdjust = true
    } else {
        diffAdjust = false
    }
    rejectRate.value = newData.RejectRate
    poolFee.value = newData.PoolFee
    elecCost.value = newData.ElectricityCost
    powerConsumtion.value = newData.PowerConsumption

    if (newData.A3 == undefined) {
        A3.value = 0
    } else {
        A3.value = newData.A3
    }

    if (newData.Baik == undefined) {
        Baik.value = 0
    } else {
        Baik.value = newData.Baik
    }

    if (newData.B52 == undefined) {
        B52.value = 0
    } else {
        B52.value = newData.B52
    }

    if (newData.iBe == undefined) {
        iBe.value = 0
    } else {
        iBe.value = newData.iBe
    }

    if (newData.S11 == undefined) {
        S11.value = 1
    } else {
        S11.value = newData.S11
    }

    if (newData.StrongU == undefined) {
        StrongU.value = 0
    } else {
        StrongU.value = newData.StrongU
    }

    if (newData.SC1 == undefined) {
        SC1.value = 0
    } else {
        SC1.value = newData.SC1
    }

}

var themeToggle = document.getElementById("diffToggleSwitch2")
if (localStorage.getItem('theme') == null) {
    themeToggle.checked = false
} else {
    var data = localStorage.getItem('theme')
    var newData = JSON.parse(data)
    themeToggle.checked = newData.Toggle
    ChangeTheme()
}


function splitInput(number) {
    let tempHshrt

    tempHshrt = number.split(".")
    if (tempHshrt.length > 1) {
        tempHshrt[0] += "."
        tempHshrt = tempHshrt.join("")
        return tempHshrt.replace(/[^1234567890.]|\-/g, "")
    }
    return number.replace(/[^1234567890.]|\-/g, "")
}

function calcDiff() {
    if (diffToggle.checked) {
        diffAdjust = true
        liveHashrate()
    } else {
        diffAdjust = false
        liveHashrate()
    }
}

function miningAPIError() {
    SiacalcHour.innerHTML = "Unable to load API"
    SiacalcDay.innerHTML = "Try refreshring page"
    SiacalcWeek.innerHTML = "or clearing cache"
    SiacalcMonth.innerHTML = ""

    SiacalcHourUSD.innerHTML = "Unable to load API"
    SiacalcDayUSD.innerHTML = "Try refreshring page"
    SiacalcWeekUSD.innerHTML = "or clearing cache"
    SiacalcMonthUSD.innerHTML = ""

    XSCcalcHour.innerHTML = "Unable to load API"
    XSCcalcDay.innerHTML = "Try refreshring page"
    XSCcalcWeek.innerHTML = "or clearing cache"
    XSCcalcMonth.innerHTML = ""

    XSCcalcHourUSD.innerHTML = "Unable to load API"
    XSCcalcDayUSD.innerHTML = "Try refreshring page"
    XSCcalcWeekUSD.innerHTML = "or clearing cache"
    XSCcalcMonthUSD.innerHTML = ""

    SCCcalcHour.innerHTML = "Unable to load API"
    SCCcalcDay.innerHTML = "Try refreshring page"
    SCCcalcWeek.innerHTML = "or clearing cache"
    SCCcalcMonth.innerHTML = ""

    SCCcalcHourUSD.innerHTML = "Unable to load API"
    SCCcalcDayUSD.innerHTML = "Try refreshring page"
    SCCcalcWeekUSD.innerHTML = "or clearing cache"
    SCCcalcMonthUSD.innerHTML = ""

    SCPcalcHour.innerHTML = "Unable to load API"
    SCPcalcDay.innerHTML = "Try refreshring page"
    SCPcalcWeek.innerHTML = "or clearing cache"
    SCPcalcMonth.innerHTML = ""
}



function sia() {
    try {
        siaAPIDifficulty = miningAPIData[0].difficulty
    } catch (e) {
        try {
            siaAPIDifficulty = miningAPIData[0].difficulty
        } catch (error) {
            console.log(error)
        }
    }

    try {
        siaAPIheight = miningAPIData[0].height
    } catch (e) {
        try {
            siaAPIheight = miningAPIData[0].height
        } catch (error) {
            console.log(error)
        }
    }

    if (usingPreset == true) {
        siaHourresult = siaReward(siaAPIDifficulty, totalObeliskHashrate * 1e9, siaAPIheight, hour)
        siaDayresult = siaReward(siaAPIDifficulty, totalObeliskHashrate * 1e9, siaAPIheight, day)
        siaWeekresult = siaReward(siaAPIDifficulty, totalObeliskHashrate * 1e9, siaAPIheight, week)
        siaMonthresult = siaReward(siaAPIDifficulty, totalObeliskHashrate * 1e9, siaAPIheight, month)
    } else {
        siaHourresult = siaReward(siaAPIDifficulty, hshrt, siaAPIheight, hour)
        siaDayresult = siaReward(siaAPIDifficulty, hshrt, siaAPIheight, day)
        siaWeekresult = siaReward(siaAPIDifficulty, hshrt, siaAPIheight, week)
        siaMonthresult = siaReward(siaAPIDifficulty, hshrt, siaAPIheight, month)
    }

    SiacalcHour.innerHTML = numberShortener(siaHourresult)
    SiacalcDay.innerHTML = numberShortener(siaDayresult)
    SiacalcWeek.innerHTML = numberShortener(siaWeekresult)
    SiacalcMonth.innerHTML = numberShortener(siaMonthresult)

    function siaReward(difficulty, hashrate, height, period) {
        if (diffAdjust) {
            return (hashrate / ((difficulty + hashrate * siaBlockTime) / siaBlockTime)) * ((300000 - height - ((period / siaBlockTime) / 2)) * (period / siaBlockTime));
        } else {
            return (hashrate / (difficulty / siaBlockTime)) * ((300000 - height - ((period / siaBlockTime) / 2)) * (period / siaBlockTime));
        }
    }
}

function siaPrice() {
    siaUSDHourresult = setCurrency(siaHourresult, siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1])
    siaUSDDayresult = setCurrency(siaDayresult, siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1])
    siaUSDWeekresult = setCurrency(siaWeekresult, siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1])
    siaUSDMonthresult = setCurrency(siaMonthresult, siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1])
    /*try {
        siaUSDHourresult = siaHourresult * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
        siaUSDDayresult = siaDayresult * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
        siaUSDWeekresult = siaWeekresult * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
        siaUSDMonthresult = siaMonthresult * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
    } catch (e) {
        try {
            siaUSDHourresult = siaHourresult * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
            siaUSDDayresult = siaDayresult * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
            siaUSDWeekresult = siaWeekresult * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
            siaUSDMonthresult = siaMonthresult * siaPriceAPIData.prices[siaPriceAPIData.prices.length - 1][1]
        } catch (error) {
            console.log(error)
        }
    }*/


    SiacalcHourUSD.innerHTML = numberShortener(siaUSDHourresult)
    SiacalcDayUSD.innerHTML = numberShortener(siaUSDDayresult)
    SiacalcWeekUSD.innerHTML = numberShortener(siaUSDWeekresult)
    SiacalcMonthUSD.innerHTML = numberShortener(siaUSDMonthresult)
}

function siaPriceError() {
    SiacalcHourUSD.innerHTML = "Unable to load API"
    SiacalcDayUSD.innerHTML = "Try refreshring page or clearing cache"
    SiacalcWeekUSD.innerHTML = ""
    SiacalcMonthUSD.innerHTML = ""
}

function hyper() {

    try {
        hyperAPIDifficulty = miningAPIData[1].difficulty
    } catch (e) {
        try {
            hyperAPIDifficulty = miningAPIData[1].difficulty
        } catch (error) {
            console.log(error)
        }
    }

    try {
        hyperAPIheight = miningAPIData[1].height
    } catch (e) {
        try {
            hyperAPIheight = miningAPIData[1].height
        } catch (error) {
            console.log(error)
        }
    }

    hyperHourresult = hyperReward(hyperAPIDifficulty, hshrt, hyperAPIheight, hour)
    hyperDayresult = hyperReward(hyperAPIDifficulty, hshrt, hyperAPIheight, day)
    hyperWeekresult = hyperReward(hyperAPIDifficulty, hshrt, hyperAPIheight, week)
    hyperMonthresult = hyperReward(hyperAPIDifficulty, hshrt, hyperAPIheight, month)

    XSCcalcHour.innerHTML = numberShortener(hyperHourresult)
    XSCcalcDay.innerHTML = numberShortener(hyperDayresult)
    XSCcalcWeek.innerHTML = numberShortener(hyperWeekresult)
    XSCcalcMonth.innerHTML = numberShortener(hyperMonthresult)

    function hyperReward(difficulty, hashrate, height, period) {
        if (diffAdjust) {
            return (hashrate / ((difficulty + hshrt * hyperBlockTime) / hyperBlockTime)) * ((60000 - (height * 0.2) - ((period / hyperBlockTime) / 2)) * (period / hyperBlockTime)) * 0.9;
        } else {
            return (hashrate / (difficulty / hyperBlockTime)) * ((60000 - (height * 0.2) - ((period / hyperBlockTime) / 2)) * (period / hyperBlockTime)) * 0.9;
        }
    }

}

function hyperPrice() {
    hyperUSDHourresult = setCurrency(hyperHourresult, hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1])
    hyperUSDDayresult = setCurrency(hyperDayresult, hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1])
    hyperUSDWeekresult = setCurrency(hyperWeekresult, hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1])
    hyperUSDMonthresult = setCurrency(hyperMonthresult, hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1])

    /*try {
        hyperUSDHourresult = hyperHourresult * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
        hyperUSDDayresult = hyperDayresult * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
        hyperUSDWeekresult = hyperWeekresult * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
        hyperUSDMonthresult = hyperMonthresult * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
    } catch (e) {
        try {
            hyperUSDHourresult = hyperHourresult * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
            hyperUSDDayresult = hyperDayresult * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
            hyperUSDWeekresult = hyperWeekresult * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
            hyperUSDMonthresult = hyperMonthresult * hyperPriceAPIData.prices[hyperPriceAPIData.prices.length - 1][1]
        } catch (error) {
            console.log(error)
        }
    }*/

    XSCcalcHourUSD.innerHTML = numberShortener(hyperUSDHourresult)
    XSCcalcDayUSD.innerHTML = numberShortener(hyperUSDDayresult)
    XSCcalcWeekUSD.innerHTML = numberShortener(hyperUSDWeekresult)
    XSCcalcMonthUSD.innerHTML = numberShortener(hyperUSDMonthresult)
}

function hyperPriceError() {
    XSCcalcHourUSD.innerHTML = "Unable to load API"
    XSCcalcDayUSD.innerHTML = "Try refreshring page"
    XSCcalcWeekUSD.innerHTML = "or clearing cache"
    XSCcalcMonthUSD.innerHTML = ""
}

function classic() {

    try {
        classicAPIDifficulty = miningAPIData[3].difficulty
    } catch (e) {
        try {
            classicAPIDifficulty = miningAPIData[3].difficulty
        } catch (error) {
            console.log(error)
        }
    }

    try {
        classicAPIheight = miningAPIData[3].height
    } catch (e) {
        try {
            classicAPIheight = miningAPIData[3].height
        } catch (error) {
            console.log(error)
        }
    }

    sccHourresult = classicReward(classicAPIDifficulty, hshrt, classicAPIheight, hour)
    sccDayresult = classicReward(classicAPIDifficulty, hshrt, classicAPIheight, day)
    sccWeekresult = classicReward(classicAPIDifficulty, hshrt, classicAPIheight, week)
    sccMonthresult = classicReward(classicAPIDifficulty, hshrt, classicAPIheight, month)

    SCCcalcHour.innerHTML = numberShortener(sccHourresult)
    SCCcalcDay.innerHTML = numberShortener(sccDayresult)
    SCCcalcWeek.innerHTML = numberShortener(sccWeekresult)
    SCCcalcMonth.innerHTML = numberShortener(sccMonthresult)


    function classicReward(difficulty, hashrate, height, period) {
        if (diffAdjust) {
            return (hashrate / ((difficulty + hshrt * classicBlockTime) / classicBlockTime)) * ((300000 - height - ((period / classicBlockTime) / 2)) * (period / classicBlockTime));
        } else {
            return (hashrate / (difficulty / classicBlockTime)) * ((300000 - height - ((period / classicBlockTime) / 2)) * (period / classicBlockTime));
        }
    }
}

function classicPrice() {

    sccUSDHourresult = setCurrency(sccHourresult, classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1])
    sccUSDDayresult = setCurrency(sccDayresult, classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1])
    sccUSDWeekresult = setCurrency(sccWeekresult, classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1])
    sccUSDMonthresult = setCurrency(sccMonthresult, classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1])
    /*try {
        sccUSDHourresult = sccHourresult * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
        sccUSDDayresult = sccDayresult * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
        sccUSDWeekresult = sccWeekresult * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
        sccUSDMonthresult = sccMonthresult * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
    } catch (e) {
        try {
            sccUSDHourresult = sccHourresult * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
            sccUSDDayresult = sccDayresult * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
            sccUSDWeekresult = sccWeekresult * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
            sccUSDMonthresult = sccMonthresult * classicPriceAPIData.prices[classicPriceAPIData.prices.length - 1][1]
        } catch (error) {
            console.log(error)
        }
    }*/

    SCCcalcHourUSD.innerHTML = numberShortener(sccUSDHourresult)
    SCCcalcDayUSD.innerHTML = numberShortener(sccUSDDayresult)
    SCCcalcWeekUSD.innerHTML = numberShortener(sccUSDWeekresult)
    SCCcalcMonthUSD.innerHTML = numberShortener(sccUSDMonthresult)
}

function classicPriceAPIError() {
    SCCcalcHourUSD.innerHTML = "Unable to load API"
    SCCcalcDayUSD.innerHTML = "Try refreshring page"
    SCCcalcWeekUSD.innerHTML = "or clearing cache"
    SCCcalcMonthUSD.innerHTML = ""
}


function prime() {

    try {
        primeAPIDifficulty = miningAPIData[2].difficulty
    } catch (e) {
        try {
            primeAPIDifficulty = miningAPIData[2].difficulty
        } catch (error) {
            console.log(error)
        }
    }

    try {
        primeAPIheight = miningAPIData[2].height
    } catch (e) {
        try {
            primeAPIheight = miningAPIData[2].height
        } catch (error) {
            console.log(error)
        }
    }

    primeHourresult = primeReward(primeAPIDifficulty, hshrt, primeAPIheight, hour)
    primeDayresult = primeReward(primeAPIDifficulty, hshrt, primeAPIheight, day)
    primeWeekresult = primeDayresult * 7 //primeReward(primeAPIDifficulty, hshrt, primeAPIheight, week)
    primeMonthresult = primeDayresult * 30 //primeReward(primeAPIDifficulty, hshrt, primeAPIheight, month)

    SCPcalcHour.innerHTML = numberShortener(primeHourresult)
    SCPcalcDay.innerHTML = numberShortener(primeDayresult)
    SCPcalcWeek.innerHTML = numberShortener(primeWeekresult)
    SCPcalcMonth.innerHTML = numberShortener(primeMonthresult)

    function primeReward(difficulty, hashrate, height, period) {
        if (diffAdjust) {
            return (hashrate / ((difficulty + hshrt * primeBlockTime) / primeBlockTime)) * ((300 - height/1000 - ((period / primeBlockTime) / 2000)) * (period / primeBlockTime) * (1 - SCPDevFee));
        } else {
            return (hashrate / (difficulty / primeBlockTime)) * ((300 - height/1000 - ((period / primeBlockTime) / 2000)) * (period / primeBlockTime) * (1 - SCPDevFee));
        }
    }
}

function primePrice() {

    primeUSDHourresult = setCurrency(primeHourresult, primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1])
    primeUSDDayresult = setCurrency(primeDayresult, primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1])
    primeUSDWeekresult = setCurrency(primeWeekresult, primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1])
    primeUSDMonthresult = setCurrency(primeMonthresult, primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1])
    /*try {
        primeUSDHourresult = primeHourresult * primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1]
        //primeUSDHourresult = primeHourresult * ((1 / CBprimePriceAPIData.last) * btcPriceAPIData.prices[btcPriceAPIData.prices.length - 1][1])
        primeUSDDayresult = primeDayresult * primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1]
        //primeUSDDayresult = primeDayresult * ((1 / CBprimePriceAPIData.last) * btcPriceAPIData.prices[btcPriceAPIData.prices.length - 1][1])
        primeUSDWeekresult = primeWeekresult * primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1]
        //primeUSDWeekresult = primeWeekresult * ((1 / CBprimePriceAPIData.last) * btcPriceAPIData.prices[btcPriceAPIData.prices.length - 1][1])
        primeUSDMonthresult = primeMonthresult * primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1]
        //primeUSDMonthresult = primeMonthresult * ((1 / CBprimePriceAPIData.last) * btcPriceAPIData.prices[btcPriceAPIData.prices.length - 1][1])
    } catch (e) {
        try {
            primeUSDHourresult = primeHourresult * primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1]
            //primeUSDHourresult = primeHourresult * ((1 / CBprimePriceAPIData.last) * btcPriceAPIData.prices[btcPriceAPIData.prices.length - 1][1])
            primeUSDDayresult = primeDayresult * primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1]
            //primeUSDDayresult = primeDayresult * ((1 / CBprimePriceAPIData.last) * btcPriceAPIData.prices[btcPriceAPIData.prices.length - 1][1])
            primeUSDWeekresult = primeWeekresult * primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1]
            //primeUSDWeekresult = primeWeekresult * ((1 / CBprimePriceAPIData.last) * btcPriceAPIData.prices[btcPriceAPIData.prices.length - 1][1])
            primeUSDMonthresult = primeMonthresult * primePriceAPIData.prices[primePriceAPIData.prices.length - 1][1]
            //primeUSDMonthresult = primeMonthresult * ((1 / CBprimePriceAPIData.last) * btcPriceAPIData.prices[btcPriceAPIData.prices.length - 1][1])
        } catch (error) {
            console.log(error)
        }
    }*/

    SCPcalcHourUSD.innerHTML = numberShortener(primeUSDHourresult)
    SCPcalcDayUSD.innerHTML = numberShortener(primeUSDDayresult)
    SCPcalcWeekUSD.innerHTML = numberShortener(primeUSDWeekresult)
    SCPcalcMonthUSD.innerHTML = numberShortener(primeUSDMonthresult)
}

function primePriceError() {
    SCPcalcHourUSD.innerHTML = "Unable to load API"
    SCPcalcDayUSD.innerHTML = "Try refreshring page or clearing cache"
    SCPcalcWeekUSD.innerHTML = ""
    SCPcalcMonthUSD.innerHTML = ""
}

function cash2() {

    try {
        CASH2APIDifficulty = cash2APIData.difficulty
    } catch (e) {
        try {
            CASH2APIDifficulty = cash2APIData.difficulty
        } catch (error) {
            console.log(error)
        }
    }

    try {
        CASH2APIheight = cash2APIData.height
    } catch (e) {
        try {
            CASH2APIheight = cash2APIData.height
        } catch (error) {
            console.log(error)
        }
    }
    if (usingPreset == true) {
        Cash2Hourresult = cash2Reward(CASH2APIDifficulty, hshrt * 0.72, CASH2APIheight, hour)
        Cash2Dayresult = cash2Reward(CASH2APIDifficulty, hshrt * 0.72, CASH2APIheight, day)
        Cash2Weekresult = cash2Reward(CASH2APIDifficulty, hshrt * 0.72, CASH2APIheight, week)
        Cash2Monthresult = cash2Reward(CASH2APIDifficulty, hshrt * 0.72, CASH2APIheight, month)
    } else {
        Cash2Hourresult = cash2Reward(CASH2APIDifficulty, hshrt, CASH2APIheight, hour)
        Cash2Dayresult = cash2Reward(CASH2APIDifficulty, hshrt, CASH2APIheight, day)
        Cash2Weekresult = cash2Reward(CASH2APIDifficulty, hshrt, CASH2APIheight, week)
        Cash2Monthresult = cash2Reward(CASH2APIDifficulty, hshrt, CASH2APIheight, month)
    }

    Cash2calcHour.innerHTML = numberShortener(Cash2Hourresult)
    Cash2calcDay.innerHTML = numberShortener(Cash2Dayresult)
    Cash2calcWeek.innerHTML = numberShortener(Cash2Weekresult)
    Cash2calcMonth.innerHTML = numberShortener(Cash2Monthresult)

    function getBlockReward(CASH2APIheight) {
        var alreadyGeneratedCoins = 0;

        for (var i = 0; i < CASH2APIheight; i++) {
            alreadyGeneratedCoins += (15000000 - alreadyGeneratedCoins) / 16777216;
        }

        return (15000000 - alreadyGeneratedCoins) / 16777216;
    }

    function cash2Reward(difficulty, hashrate, height, period) {
        if (diffAdjust) {
            return (hashrate / (((difficulty * 1099511627776) + hshrt * cash2BlockTime) / cash2BlockTime)) * ((getBlockReward(height + ((period / cash2BlockTime) / 2))) * (period / cash2BlockTime))
        } else {
            return (hashrate / ((difficulty * 1099511627776) / cash2BlockTime)) * ((getBlockReward(height + ((period / cash2BlockTime) / 2))) * (period / cash2BlockTime))
        }
    }
}

function cash2Price() {
    Cash2USDHourresult = setCurrency(Cash2Hourresult, cash2PriceAPIData.prices[cash2PriceAPIData.prices.length - 1][1])
    Cash2USDDayresult = setCurrency(Cash2Dayresult, cash2PriceAPIData.prices[cash2PriceAPIData.prices.length - 1][1])
    Cash2USDWeekresult = setCurrency(Cash2Weekresult, cash2PriceAPIData.prices[cash2PriceAPIData.prices.length - 1][1])
    Cash2USDMonthresult = setCurrency(Cash2Monthresult, cash2PriceAPIData.prices[cash2PriceAPIData.prices.length - 1][1])

    /*try {
        Cash2USDHourresult = Cash2Hourresult * cash2PriceAPIData.prices[cash2PriceAPIData.prices.length - 1][1]
        Cash2USDDayresult = Cash2Dayresult * cash2PriceAPIData.prices[cash2PriceAPIData.prices.length - 1][1]
        Cash2USDWeekresult = Cash2Weekresult * cash2PriceAPIData.prices[cash2PriceAPIData.prices.length - 1][1]
        Cash2USDMonthresult = Cash2Monthresult * cash2PriceAPIData.prices[cash2PriceAPIData.prices.length - 1][1]
    } catch (e) {
        try {
            Cash2USDHourresult = Cash2Hourresult * cash2PriceAPIData.prices[cash2APIData.prices.length - 1][1]
            Cash2USDDayresult = Cash2Dayresult * cash2PriceAPIData.prices[cash2PriceAPIData.prices.length - 1][1]
            Cash2USDWeekresult = Cash2Weekresult * cash2PriceAPIData.prices[cash2PriceAPIData.prices.length - 1][1]
            Cash2USDMonthresult = Cash2Monthresult * cash2PriceAPIData.prices[cash2PriceAPIData.prices.length - 1][1]
        } catch (error) {
            console.log(error)
        }
    }*/

    Cash2calcHourUSD.innerHTML = numberShortener(Cash2USDHourresult)
    Cash2calcDayUSD.innerHTML = numberShortener(Cash2USDDayresult)
    Cash2calcWeekUSD.innerHTML = numberShortener(Cash2USDWeekresult)
    Cash2calcMonthUSD.innerHTML = numberShortener(Cash2USDMonthresult)
}

const currencyToggleSwitch = document.getElementById("currencyToggleSwitch")
var currency
const currencyText = document.getElementsByClassName("currencyText")
const powerCostText = document.getElementById("powerCostText")

function toggleCurrency() {
    if (currencyToggleSwitch.checked) { //BTC
        currency = "Sats"
        powerCostText.innerHTML = "Power(Sats)"
        liveHashrate()
    } else { //USD
        currency = "USD"
        powerCostText.innerHTML = "Power(USD)"
        liveHashrate()
    }

    for (i = 0; i < currencyText.length; i++) {
        currencyText[i].innerHTML = currency
    }
}


function calcProfit() {
    if (poolFee.value >= 0 || elecCost.value >= 0 || powerConsumtion.value >= 0 || rejectRate.value >= 0) {
        if (currency == "USD") {
            PowerCostHourResult = (((powerConsumtion.value * 1) / 1000) * elecCost.value) * -1
            PowerCostDayResult = (((powerConsumtion.value * 24) / 1000) * elecCost.value) * -1
            PowerCostWeekResult = ((((powerConsumtion.value * 24) / 1000) * 7) * elecCost.value) * -1
            PowerCostMonthResult = ((((powerConsumtion.value * 24) / 1000) * 30) * elecCost.value) * -1
        } else if (currency == "Sats") {
            PowerCostHourResult = (((((powerConsumtion.value * 1) / 1000) * elecCost.value) * -1) / bitcoinUSDPrice) * 10000000
            PowerCostDayResult = (((((powerConsumtion.value * 24) / 1000) * elecCost.value) * -1) / bitcoinUSDPrice) * 10000000
            PowerCostWeekResult = ((((((powerConsumtion.value * 24) / 1000) * 7) * elecCost.value) * -1) / bitcoinUSDPrice) * 10000000
            PowerCostMonthResult = ((((((powerConsumtion.value * 24) / 1000) * 30) * elecCost.value) * -1) / bitcoinUSDPrice) * 10000000
        }

        //PowerCost
        PowerCostHour.innerHTML = numberShortener(PowerCostHourResult)
        PowerCostDay.innerHTML = numberShortener(PowerCostDayResult)
        PowerCostWeek.innerHTML = numberShortener(PowerCostWeekResult)
        PowerCostMonth.innerHTML = numberShortener(PowerCostMonthResult)

        //HyperSpace
        XSCresultHourProfit.innerHTML = numberShortener(feeCalc(rejectCalc(hyperHourresult)))
        XSCresultDayProfit.innerHTML = numberShortener(feeCalc(rejectCalc(hyperDayresult)))
        XSCresultWeekProfit.innerHTML = numberShortener(feeCalc(rejectCalc(hyperWeekresult)))
        XSCresultMonthProfit.innerHTML = numberShortener(feeCalc(rejectCalc(hyperMonthresult)))

        XSCresultHourProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(hyperUSDHourresult, 1, 1), XSCresultHourProfitUSD)))
        XSCresultDayProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(hyperUSDDayresult, 24, 1), XSCresultDayProfitUSD)))
        XSCresultWeekProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(hyperUSDWeekresult, 24, 7), XSCresultWeekProfitUSD)))
        XSCresultMonthProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(hyperUSDMonthresult, 24, 30), XSCresultMonthProfitUSD)))

        //SiaPrime
        SCPresultHourProfit.innerHTML = numberShortener(feeCalc(rejectCalc(primeHourresult)))
        SCPresultDayProfit.innerHTML = numberShortener(feeCalc(rejectCalc(primeDayresult)))
        SCPresultWeekProfit.innerHTML = numberShortener(feeCalc(rejectCalc(primeWeekresult)))
        SCPresultMonthProfit.innerHTML = numberShortener(feeCalc(rejectCalc(primeMonthresult)))

        SCPresultHourProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(primeUSDHourresult, 1, 1), SCPresultHourProfitUSD)))
        SCPresultDayProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(primeUSDDayresult, 24, 1), SCPresultDayProfitUSD)))
        SCPresultWeekProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(primeUSDWeekresult, 24, 7), SCPresultWeekProfitUSD)))
        SCPresultMonthProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(primeUSDMonthresult, 24, 30), SCPresultMonthProfitUSD)))

        //SiaClassic
        SCCresultHourProfit.innerHTML = numberShortener(feeCalc(rejectCalc(sccHourresult)))
        SCCresultDayProfit.innerHTML = numberShortener(feeCalc(rejectCalc(sccDayresult)))
        SCCresultWeekProfit.innerHTML = numberShortener(feeCalc(rejectCalc(sccWeekresult)))
        SCCresultMonthProfit.innerHTML = numberShortener(feeCalc(rejectCalc(sccMonthresult)))

        SCCresultHourProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(sccUSDHourresult, 1, 1), SCCresultHourProfitUSD)))
        SCCresultDayProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(sccUSDDayresult, 24, 1), SCCresultDayProfitUSD)))
        SCCresultWeekProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(sccUSDWeekresult, 24, 7), SCCresultWeekProfitUSD)))
        SCCresultMonthProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(sccUSDMonthresult, 24, 30), SCCresultMonthProfitUSD)))

        //Sia
        SiaresultHourProfit.innerHTML = numberShortener(feeCalc(rejectCalc(siaHourresult)))
        SiaresultDayProfit.innerHTML = numberShortener(feeCalc(rejectCalc(siaDayresult)))
        SiaresultWeekProfit.innerHTML = numberShortener(feeCalc(rejectCalc(siaWeekresult)))
        SiaresultMonthProfit.innerHTML = numberShortener(feeCalc(rejectCalc(siaMonthresult)))

        SiaresultHourProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcObelisk(siaUSDHourresult, 1, 1), SiaresultHourProfitUSD)))
        SiaresultDayProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcObelisk(siaUSDDayresult, 24, 1), SiaresultDayProfitUSD)))
        SiaresultWeekProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcObelisk(siaUSDWeekresult, 24, 7), SiaresultWeekProfitUSD)))
        SiaresultMonthProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcObelisk(siaUSDMonthresult, 24, 30), SiaresultMonthProfitUSD)))

        //Cash2
        Cash2resultHourProfit.innerHTML = numberShortener(feeCalc(rejectCalc(Cash2Hourresult)))
        Cash2resultDayProfit.innerHTML = numberShortener(feeCalc(rejectCalc(Cash2Dayresult)))
        Cash2resultWeekProfit.innerHTML = numberShortener(feeCalc(rejectCalc(Cash2Weekresult)))
        Cash2resultMonthProfit.innerHTML = numberShortener(feeCalc(rejectCalc(Cash2Monthresult)))

        Cash2resultHourProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(Cash2USDHourresult, 1, 1), Cash2resultHourProfitUSD)))
        Cash2resultDayProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(Cash2USDDayresult, 24, 1), Cash2resultDayProfitUSD)))
        Cash2resultWeekProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(Cash2USDWeekresult, 24, 7), Cash2resultWeekProfitUSD)))
        Cash2resultMonthProfitUSD.innerHTML = numberShortener(rejectCalc(colorProfit(feeCalcUSD(Cash2USDMonthresult, 24, 30), Cash2resultMonthProfitUSD)))
    }
}

//siaprice / btcprice
function setCurrency(coinAmount, coinUSDPrice) {
    if (currency == "USD") {
        try {
            return feeCalc(coinAmount * coinUSDPrice)
        } catch (e) {
            try {
                return feeCalc(coinAmount * coinUSDPrice)
            } catch (error) {
                console.log(error)
            }
        }
    } else if (currency == "Sats") {
        try {
            return feeCalc(((coinAmount * coinUSDPrice) / bitcoinUSDPrice) * 10000000)
        } catch (e) {
            try {
                return feeCalc(((coinAmount * coinUSDPrice) / bitcoinUSDPrice) * 10000000)
            } catch (error) {
                console.log(error)
            }
        }
    }
}

function presetUpdate() {
    A3.value = A3.value.replace(/[^1234567890]/g, "")
    Baik.value = Baik.value.replace(/[^1234567890]/g, "")
    B52.value = B52.value.replace(/[^1234567890]/g, "")
    iBe.value = iBe.value.replace(/[^1234567890]/g, "")
    S11.value = S11.value.replace(/[^1234567890]/g, "")
    SC1.value = SC1.value.replace(/[^1234567890]/g, "")
    StrongU.value = StrongU.value.replace(/[^1234567890]/g, "")

    A3preset = A3.value
    Baikpreset = Baik.value
    B52preset = B52.value
    iBepreset = iBe.value
    S11preset = S11.value
    SC1preset = SC1.value
    StrongUpreset = StrongU.value

    //Antminer A3
    if (A3preset >= 1 && A3preset < 999) {
        A3presetFinal = 815 * A3preset
        A3presetPower = 1275 * A3preset
    }
    else if (A3preset >= 999) {
        A3.value = 999
        A3presetFinal = 815 * 999
        A3presetPower = 1275 * 999
    }
    else if (A3preset <= 0) {
        A3presetFinal = 0
        A3presetPower = 0
    }

    //Baikal BK-B
    if (Baikpreset >= 1 && Baikpreset < 999) {
        BaikpresetFinal = 160 * Baikpreset
        BaikpresetPower = 410 * Baikpreset
    }
    else if (Baikpreset >= 999) {
        Baik.value = 999
        BaikpresetFinal = 160 * 999
        BaikpresetPower = 410 * 999
    }
    else if (Baikpreset <= 0) {
        BaikpresetFinal = 0
        BaikpresetPower = 0
    }

    //Halong Mining DragonMint B52
    if (B52preset >= 1 && B52preset < 999) {
        B52presetFinal = 3830 * B52preset
        B52presetPower = 1380 * B52preset
    }
    else if (B52preset >= 999) {
        B52.value = 999
        B52presetFinal = 3830 * 999
        B52presetPower = 1380 * 999
    }
    else if (B52preset <= 0) {
        B52presetFinal = 0
        B52presetPower = 0
    }

    //iBeLink DSM7T
    if (iBepreset >= 1 && iBepreset < 999) {
        iBepresetFinal = 7000 * iBepreset
        iBepresetPower = 2100 * iBepreset
    }
    else if (iBepreset >= 999) {
        iBe.value = 999
        iBepresetFinal = 7000 * 999
        iBepresetPower = 2100 * 999
    }
    else if (iBepreset <= 0) {
        iBepresetFinal = 0
        iBepresetPower = 0
    }

    //Innosilicon S11
    if (S11preset >= 1 && S11preset < 999) {
        S11presetFinal = 4300 * S11preset
        S11presetPower = 1350 * S11preset
    }
    else if (S11preset >= 999) {
        S11.value = 999
        S11presetFinal = 4300 * 999
        S11presetPower = 1350 * 999
    }
    else if (S11preset <= 0) {
        S11presetFinal = 0
        S11presetPower = 0
    }

    //Obelisk SC1
    if (SC1preset >= 1 && SC1preset < 999) {
        SC1presetFinal = 550 * SC1preset
        SC1presetPower = 500 * SC1preset
    }
    else if (SC1preset >= 999) {
        SC1.value = 999
        SC1presetFinal = 550 * 999
        SC1presetPower = 500 * 999
    }
    else if (SC1preset <= 0) {
        SC1presetFinal = 0
        SC1presetPower = 0
    }

    //StrongU STU-U2
    if (StrongUpreset >= 1 && StrongUpreset < 999) {
        StrongUpresetFinal = 6000 * StrongUpreset
        StrongUpresetPower = 1600 * StrongUpreset
    }
    else if (StrongUpreset >= 999) {
        StrongU.value = 999
        StrongUpresetFinal = 6000 * 999
        StrongUpresetPower = 1600 * 999
    }
    else if (StrongUpreset <= 0) {
        StrongUpresetFinal = 0
        StrongUpresetPower = 0
    }

    totalBlake2bHashrate = A3presetFinal + BaikpresetFinal + B52presetFinal + iBepresetFinal + S11presetFinal + StrongUpresetFinal
    totalObeliskHashrate = SC1presetFinal

    totalPresetHashrate = totalBlake2bHashrate + totalObeliskHashrate

    if (totalPresetHashrate >= 1000) {
        totalPresetHashrate = totalPresetHashrate / 1000
        hashPower.selectedIndex = 1
    }
    else {
        hashPower.selectedIndex = 0
    }

    totalBlake2bPower = A3presetPower + BaikpresetPower + B52presetPower + iBepresetPower + S11presetPower + StrongUpresetPower
    totalObeliskPower = SC1presetPower
    totalPresetPower = totalObeliskPower + totalBlake2bPower
    userHshrt.value = totalPresetHashrate.toFixed(2)
    powerConsumtion.value = totalPresetPower.toFixed(2)
    usingPreset = true
    liveHashrate()
}

function numberShortener(num) {
    let tempNum

    if (num <= 999 && num >= 0) {
        tempNum = num.toFixed(2)
    }
    else if (num >= 1000 && num < 1000000) {
        tempNum = (num / 1000).toFixed(2) + " k"
    }
    else if (num >= 1000000 && num < 1000000000) {
        tempNum = (num / 1000000).toFixed(2) + " M"
    }
    else if (num >= 1000000000 && num < 99999999999) {
        tempNum = (num / 1000000000).toFixed(2) + " B"
    }
    else if (num >= 99999999999) {
        tempNum = 99.99 + "+ B"
    }
    else if (num >= -999 && num < 0) {
        tempNum = num.toFixed(2)
    }
    else if (num <= -1000 && num > -1000000) {
        tempNum = (num / 1000).toFixed(2) + " k"
    }
    else if (num <= 1000000 && num > -1000000000) {
        tempNum = (num / 1000000).toFixed(2) + " M"
    }
    else if (num <= -1000000000 && num > -99999999999) {
        tempNum = (num / 1000000000).toFixed(2) + " B"
    }
    else if (num <= -99999999999) {
        tempNum = -99.99 + "+ B"
    }
    else {
        tempNum = "0.00"
    }

    return tempNum
}

function rejectCalc(coin) {
    if (rejectRate.value > 0) {
        return coin - (coin * (rejectRate.value / 100))
    } else {
        return coin
    }
}

function feeCalc(coin) {
    return coin - (coin * (poolFee.value / 100))
}

function feeCalcUSD(coin, time1, time2) {
    if (currency == "USD") {
        return (coin - (coin * (poolFee.value / 100))) - ((((powerConsumtion.value * time1) / 1000) * time2) * elecCost.value)
    } else if (currency == "Sats") {
        return (coin - (coin * (poolFee.value / 100))) - ((((((powerConsumtion.value * time1) / 1000) * time2) * elecCost.value) / bitcoinUSDPrice) * 10000000)
    }

}

function feeCalcObelisk(coin, time1, time2) {
    if (currency == "USD") {
        return (coin - (coin * (poolFee.value / 100))) - ((((totalObeliskPower * time1) / 1000) * time2) * elecCost.value)
    } else if (currency == "Sats") {
        return (coin - (coin * (poolFee.value / 100))) - ((((((totalObeliskPower * time1) / 1000) * time2) * elecCost.value) / bitcoinUSDPrice) * 10000000)
    }

}

function colorProfit(coin, coinHTML) {
    if (themeToggle.checked == false) {
        if (coin > 0) {
            coinHTML.style.color = greenColor
        } else {
            coinHTML.style.color = redColor
        }
    } else {
        if (coin > 0) {
            coinHTML.style.color = greenColorDark
        } else {
            coinHTML.style.color = redColorDark
        }
    }
    return coin
}

function saveData() {
    var data = { Hashrate: userHshrt.value, HashPower: hashPower.value, DifficultyAdjust: diffToggle.checked, RejectRate: rejectRate.value, PoolFee: poolFee.value, ElectricityCost: elecCost.value, PowerConsumption: powerConsumtion.value, A3: A3.value, Baik: Baik.value, B52: B52.value, iBe: iBe.value, S11: S11.value, StrongU: StrongU.value, SC1: SC1.value }
    var strData = JSON.stringify(data)
    localStorage.setItem('mainData', strData);
}

function deleteData() {
    localStorage.removeItem('mainData');
}


function ChangeTheme() {
    var inputsTheme = document.getElementsByClassName("inputThemeJS");
    var poolLinkTheme = document.getElementsByClassName("coinPoolList");
    var presetDataTheme = document.getElementsByClassName("presetData");
    var tooltipIMG = document.getElementsByClassName("tooltipJS");
    var HomeIMG = document.getElementsByClassName("HomeIMG")

    if (themeToggle.checked == true) {
        var data = { Toggle: themeToggle.checked }
        var strData = JSON.stringify(data)
        localStorage.setItem('theme', strData);
        calcProfit()
        var currentTheme = document.body.children
        for (var i = 0; i < currentTheme.length; i++) {
            currentTheme[i].style.color = "white";
        }

        if (splitInput(SiaVolumeValue.innerHTML) < 100) {
            SiaVolumeValue.style.color = redColorDark
        } else {
            SiaVolumeValue.style.color = "white"
        }


        if (splitInput(XSCVolumeValue.innerHTML) < 100) {
            XSCVolumeValue.style.color = redColorDark
        } else {
            XSCVolumeValue.style.color = "white"
        }


        if (splitInput(SCPVolumeValue.innerHTML) < 100) {
            SCPVolumeValue.style.color = redColorDark
        } else {
            SCPVolumeValue.style.color = "white"
        }


        if (splitInput(SCCVolumeValue.innerHTML) < 100) {
            SCCVolumeValue.style.color = redColorDark
        } else {
            SCCVolumeValue.style.color = "white"
        }


        if (splitInput(Cash2VolumeValue.innerHTML) < 100) {
            Cash2VolumeValue.style.color = redColorDark
        } else {
            Cash2VolumeValue.style.color = "white"
        }

        currentTheme[0].style.backgroundColor = "#3b3d3f"
        currentTheme[1].style.backgroundColor = "#535659"
        currentTheme[1].children[0].children[0].children[0].children[0].style.backgroundColor = "#404244"
        currentTheme[1].children[0].children[0].children[2].children[1].style.backgroundColor = "rgb(64, 72, 86, 0.6)"
        currentTheme[1].children[0].children[0].children[2].children[2].style.backgroundColor = "rgb(64, 72, 86, 0.6)"
        currentTheme[1].children[0].children[0].children[2].children[3].style.backgroundColor = "rgb(64, 72, 86, 0.6)"
        currentTheme[1].children[0].children[0].children[2].children[4].style.backgroundColor = "rgb(64, 72, 86, 0.6)"
        currentTheme[2].style.backgroundColor = "#3b3d3f"
        document.body.style.background = "#535659"
        currentTheme[2].style.borderColor = "#28292b"
        HomeIMG[0].style.filter = "invert(1)"
        for (var i = 0; i < inputsTheme.length; i++) {
            inputsTheme[i].style.backgroundColor = "#90969b"
            inputsTheme[i].style.color = "white"
        }
        for (var i = 0; i < poolLinkTheme.length; i++) {
            poolLinkTheme[i].style.color = "#669fff"
        }
        for (var i = 0; i < presetDataTheme.length; i++) {
            presetDataTheme[i].style.color = "white"
        }

        for (var i = 0; i < tooltipIMG.length; i++) {
            tooltipIMG[i].style.filter = "invert(1)"

        }

    } else {
        var data = { Toggle: themeToggle.checked }
        var strData = JSON.stringify(data)
        localStorage.setItem('theme', strData);
        calcProfit()
        var currentTheme = document.body.children
        for (var i = 0; i < currentTheme.length; i++) {
            currentTheme[i].style.removeProperty("color")
            currentTheme[i].style.removeProperty("background-color")
            currentTheme[i].style.removeProperty("border-color")
        }

        if (splitInput(SiaVolumeValue.innerHTML) < 100) {
            SiaVolumeValue.style.color = redColor
        } else {
            SiaVolumeValue.style.color = "white"
        }

        if (splitInput(XSCVolumeValue.innerHTML) < 100) {
            XSCVolumeValue.style.color = redColor
        } else {
            XSCVolumeValue.style.color = "white"
        }

        if (splitInput(SCPVolumeValue.innerHTML) < 100) {
            SCPVolumeValue.style.color = redColor
        } else {
            SCPVolumeValue.style.color = "white"
        }

        if (splitInput(SCCVolumeValue.innerHTML) < 100) {
            SCCVolumeValue.style.color = redColor
        } else {
            SCCVolumeValue.style.color = "white"
        }

        if (splitInput(Cash2VolumeValue.innerHTML) < 100) {
            Cash2VolumeValue.style.color = redColor
        } else {
            Cash2VolumeValue.style.color = "white"
        }


        currentTheme[1].children[0].children[0].children[0].children[0].style.removeProperty("background-color")
        document.body.style.removeProperty("background-color")
        currentTheme[1].children[0].children[0].children[2].children[1].style.removeProperty("background-color")
        currentTheme[1].children[0].children[0].children[2].children[2].style.removeProperty("background-color")
        currentTheme[1].children[0].children[0].children[2].children[3].style.removeProperty("background-color")
        currentTheme[1].children[0].children[0].children[2].children[4].style.removeProperty("background-color")
        HomeIMG[0].style.removeProperty("filter")
        for (var i = 0; i < inputsTheme.length; i++) {
            inputsTheme[i].style.removeProperty("background-color")
            inputsTheme[i].style.removeProperty("color")
        }
        for (var i = 0; i < poolLinkTheme.length; i++) {
            poolLinkTheme[i].style.removeProperty("color")
        }
        for (var i = 0; i < presetDataTheme.length; i++) {
            presetDataTheme[i].style.removeProperty("color")
        }
        for (var i = 0; i < tooltipIMG.length; i++) {
            tooltipIMG[i].style.removeProperty("filter")
        }
    }



}
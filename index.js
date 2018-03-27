/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');
const request = require('request');

const APP_ID = 'amzn1.ask.skill.SKILL_ID_HERE';

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  'LaunchRequest': function () {
    this.emit('GetMercuryRetrograde');
  },
  'GetMercuryRetrograde': function () {
    const that = this;
    let speechOutput = 'Sorry, unable to find out if Mercury is retrograde.';
    request({
      url: 'https://mercuryretrogradeapi.com/',
      json: true,
    }, function(err, resp, body) {
      if (!err) {
        if (body.is_retrograde) {
          speechOutput = 'Mercury is retrograde.';
        } else {
          speechOutput = 'Mercury is not retrograde.';
        }
      }
      that.emit(':tellWithCard', speechOutput, 'Is Mercury Retrograde', speechOutput);
    });
  },
  'AMAZON.HelpIntent': function () {
    const speechOutput = 'This skill tells if Mercury is retrograde.';
    this.emit(':ask', speechOutput, speechOutput);
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'AMAZON.YesIntent': function () {
    this.emit('GetMercuryRetrograde');
  },
  'AMAZON.NoIntent': function () {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
};

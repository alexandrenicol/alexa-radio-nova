import {
  HandlerInput,
  RequestHandler,
  SkillBuilders,
  getRequestType,
  getIntentName,
  ErrorHandler,
} from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { CommonHandlerFactory } from './request-handlers/common';

const STREAM_URL = 'https://novazz.ice.infomaniak.ch/novazz-128.mp3';

const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput: HandlerInput): Response {
    return handlerInput.responseBuilder
      .addAudioPlayerPlayDirective('REPLACE_ALL', STREAM_URL, STREAM_URL, 0)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const PlayIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getIntentName(handlerInput.requestEnvelope) === 'Play'
    );
  },
  handle(handlerInput: HandlerInput): Response {
    return handlerInput.responseBuilder
      .addAudioPlayerPlayDirective('REPLACE_ALL', STREAM_URL, STREAM_URL, 0)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const PauseIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent'
    );
  },
  handle(handlerInput: HandlerInput): Response {
    return handlerInput.responseBuilder
      .addAudioPlayerStopDirective()
      .getResponse();
  },
};

const ResumeIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ResumeIntent'
    );
  },
  handle(handlerInput: HandlerInput): Response {
    return handlerInput.responseBuilder
      .addAudioPlayerPlayDirective('REPLACE_ALL', STREAM_URL, STREAM_URL, 0)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const CancelAndStopIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      (getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' ||
        getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent')
    );
  },
  handle(handlerInput: HandlerInput): Response {
    return handlerInput.responseBuilder
      .addAudioPlayerStopDirective()
      .getResponse();
  },
};

const commonHandlers = CommonHandlerFactory('say, play');

exports.handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    PlayIntentHandler,
    PauseIntentHandler,
    ResumeIntentHandler,
    CancelAndStopIntentHandler,
    commonHandlers.HelpIntentHandler as RequestHandler,
    commonHandlers.SessionEndedRequestHandler as RequestHandler,
    commonHandlers.IntentReflectorHandler as RequestHandler
  )
  .addErrorHandlers(commonHandlers.CustomErrorHandler as ErrorHandler)
  .lambda();

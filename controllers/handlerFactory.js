const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      next(new AppError('No document found with this id', 404));
    }
    res.status(204).json({ status: 'success', data: null });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return next(new AppError('No document found with this id', 404));
    }

    res.status(200).json({ status: 'success', data: { data: document } });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: document,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    let query = Model.findById(id);
    if (popOptions) {
      query = query.populate(popOptions);
    }

    const document = await query;

    if (!document) {
      next(new AppError('No document found with this id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { data: document },
    });
  });

exports.getAll = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.id) {
      filter = {
        tour: req.params.id,
      };
    }
    let query = Model.find(filter);

    if (popOptions) {
      query = query.populate(popOptions);
    }

    const features = new APIFeatures(query, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const documents = await features.query.explain();
    const documents = await features.query;
    if (!documents) {
      next(new AppError('No documents found', 404));
    }

    res.status(200).json({
      status: 'success',
      results: documents.length,
      requestTime: req.requestTime,
      data: { data: documents },
    });
  });

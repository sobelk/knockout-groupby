(function() {

  ko.bindingHandlers.groupby = {
    makeTemplateValueAccessor: function(valueAccessor) {
      var bindingValue, groupedArrays, groups, key, keys, obj, objectsInGroup, _i, _j, _len, _len1, _ref,
        _this = this;
      bindingValue = ko.utils.unwrapObservable(valueAccessor());
      groups = {};
      if (ko.isObservable(bindingValue.group) &&
          bindingValue.group.hasOwnProperty('remove')) {
        _ref = bindingValue.group();
      }	else {
        _ref = bindingValue.group;
      }
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        key = bindingValue.by(obj);
        if (groups[key] === void 0) {
          groups[key] = [obj];
        } else {
          groups[key].push(obj);
        }
      }
      keys = (function() {
        var _results;
        _results = [];
        for (var key in groups) {
          _results.push(key);
        }
        return _results;
      })();
      if (typeof bindingValue.sort === 'function') {
        keys.sort(bindingValue.sort);
      } else if (typeof bindingValue.sort === 'string') {
        if (bindingValue.sort === 'ascending') {
          keys.sort();
        } else if (bindingValue.sort === 'descending') {
          keys.sort();
          keys.reverse();
        }
      }
      groupedArrays = [];
      for (_j = 0, _len1 = keys.length; _j < _len1; _j++) {
        key = keys[_j];
        objectsInGroup = groups[key];
        objectsInGroup.$key = key;
        groupedArrays.push(objectsInGroup);
      }
      return function() {
        return {
          foreach: groupedArrays,
          templateEngine: ko.nativeTemplateEngine.instance
        };
      };
    },
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      return ko.bindingHandlers.template.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var newValueAccessor;
      newValueAccessor = ko.bindingHandlers.groupby.makeTemplateValueAccessor(valueAccessor);
      return ko.bindingHandlers.template.update(element, newValueAccessor, allBindingsAccessor, viewModel, bindingContext);
    }
  };

}).call(this);

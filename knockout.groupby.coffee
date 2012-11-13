# extend knockout.js with 'groupby' binding
#
ko.bindingHandlers.groupby =
    makeTemplateValueAccessor: (valueAccessor) ->
        bindingValue = ko.utils.unwrapObservable(valueAccessor())

        groups = {}
        for obj in bindingValue.group
            key = bindingValue.by(obj)
            if groups[key] is undefined
                groups[key] = [obj]
            else
                groups[key].push obj

        keys = (key for key of groups)

        if typeof bindingValue.sort == 'function'
            keys.sort(bindingValue.sort)
        else if typeof bindingValue.sort == 'string'
            if bindingValue.sort == 'ascending'
                keys.sort()
            else if bindingValue.sort == 'descending'
                keys.sort()
                keys.reverse()

        groupedArrays = []
        for key in keys
            objectsInGroup = groups[key]
            objectsInGroup.$key = key
            groupedArrays.push(objectsInGroup)

        return =>
            foreach: groupedArrays
            templateEngine: ko.nativeTemplateEngine.instance
            
    init: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) ->
        return ko.bindingHandlers.template.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext)

    update: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) ->
        newValueAccessor = ko.bindingHandlers.groupby.makeTemplateValueAccessor(valueAccessor)
        return ko.bindingHandlers.template.update(element, newValueAccessor, allBindingsAccessor, viewModel, bindingContext)

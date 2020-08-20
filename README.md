## What is JavaScript SimpleLib?

Just a simple set of scripts implementing common tasks like:
- Ajax calls with spinners;
- Several utilities methods to show Sweet Alerts (https://sweetalert2.github.io/);

## Ajax Calls

ajax-helper.js have a set of methods that encapulate Ajax Calls using JQuery with features like:

- Spinner loading (using https://vadimsva.github.io/waitMe/);

```
AjaxCall({
    method: 'GET',
    relativeUrl: 'MyURL',
    elementToSpin: 'card-value' -- here the spin will be displayed above the card-value element, if nothing is provided, the spin will be displayed above the body
}).done((res) => {
    if (res.success) {
        // handle success
    }
    else {
        // handle error
    }
});

```

- Ajax calls automatically generated from a form;

```
<form method="post" action="MyURL" id="MyFormID">
    
    <div class="form-group">        
        <textarea id="MyField" class="form-control"></textarea>        
    </div>
    
    <button type="submit" class="btn btn-primary">Action!</button>
</form>
```

```
SetFormToAjaxCall('MyFormID', function (res) {
    if (res.success) {
        // if my the POST request was sucessfully handled do something
    }
});
```

When any submit occurs in MyForm (e.g. clicking in Action button), all fields that belongs to it are encapulated in a object to be sent as payload to the action URL. In the example above, an object like that { myField: "VALUE" } will be sent to MyURL.

- API errors and validation messages handling;

If your API return data using this format you can use our result handling:

```
{
    success: true,
    data: { },
    errors: [
        {
            errorMessage: '',
        }
    ]
}
```

This way, if your API return some validation error, ajax-helper can handle it, showing the proper error list.

### Ajax Calls - API Ref:

```
AjaxCall( {

    method: 'GET', 
    showSpinner: true, -- disable spinners
    handleResult: true, -- disable API result handling 
    contentType: 'application/json', 
    dataType: 'json'

} );

SetFormToAjaxCall( 

    formId, -- formId that should have its calls automatically sent async
    completedCallback -- completed callback that will be called when some request is completed

);
```
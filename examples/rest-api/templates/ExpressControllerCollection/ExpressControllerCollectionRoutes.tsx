import { Text, geckoJSX } from '@flatfile/gecko'

export function ExpressControllerCollectionRoutes(props: {
  controllerPath: string
  repositoryVariableName: string
  resourceName: string
  resourceNamePlural: string
  resourceUrl: string
}) {
  function ControllerRoute(routeProps: {
    controllerName: string
    controllerFile: string
    httpMethod: 'get' | 'post' | 'put' | 'delete'
    itemRoute?: true
  }) {
    return (
      <Text>
        {`import ${routeProps.controllerName}Controller from '${props.controllerPath}/${routeProps.controllerFile}'`}
        {`\n`}
        {`app.${routeProps.httpMethod}('${
          props.resourceUrl
        }${routeProps.itemRoute ? '/:id' : ''}', ${
          routeProps.controllerName
        }Controller(${props.repositoryVariableName}))`}
        {`\n`}
      </Text>
    )
  }

  return (
    <>
      <ControllerRoute
        controllerName={`List${props.resourceNamePlural}`}
        controllerFile="list"
        httpMethod="get"
      />
      <ControllerRoute
        controllerName={`Get${props.resourceName}`}
        controllerFile="get"
        httpMethod="get"
        itemRoute
      />
      <ControllerRoute
        controllerName={`Create${props.resourceName}`}
        controllerFile="create"
        httpMethod="post"
      />
      <ControllerRoute
        controllerName={`Update${props.resourceName}`}
        controllerFile="update"
        httpMethod="put"
        itemRoute
      />
      <ControllerRoute
        controllerName={`Delete${props.resourceName}`}
        controllerFile="delete"
        httpMethod="delete"
        itemRoute
      />
    </>
  )
}

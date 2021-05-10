import { useContext, useEffect } from "react"
import { setupAPIClient } from "../services/api"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"
import { AuthContext } from "../contexts/AuthContext"
import { useCan } from "../hooks/useCan"

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  const userCanSeeMetrics = useCan({
    permissions : ['metrics.list']
  })

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <h1>dashboard: {user?.email}</h1>

      { userCanSeeMetrics && <div>Métricas</div> }
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get('/me')
  console.log(response.data);

  return {
    props: {}
  }
})
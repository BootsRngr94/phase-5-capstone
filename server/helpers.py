def get_pool_visits(technician):
    if technician:
        pool_visits = [visit.to_dict() for visit in technician.pool_visits]
        return pool_visits
    else:
        return []

def get_assigned_pools(technician):
    if technician:
        assigned_pools = [pool_visit.pool.to_dict() for pool_visit in technician.pool_visits]
        return assigned_pools
    else:
        return []

def get_related_clients(technician):
    return [client.to_dict() for client in technician.clients]
